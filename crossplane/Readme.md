
# Homework: Deploying Applications with Crossplane

## **Objective**
In this assignment, you will:
1. Install and configure **Crossplane**
2. Create a custom **Composite Resource Definition (XRD)**
3. Deploy a simple web application using Crossplane
4. Manage the application lifecycle

---

## **Part 1: Installation & Configuration**

### **Step 1: Install Required Tools**
Ensure you have:
- **kubectl**
- **helm**
- **kind** (for local Kubernetes cluster)

#### **1. Create Local Cluster**
```sh
kind create cluster --name crossplane-demo
```

#### **2. Install Crossplane**
```sh
helm repo add crossplane-stable https://charts.crossplane.io/stable
helm repo update
helm install crossplane crossplane-stable/crossplane --namespace crossplane-system --create-namespace
```

#### **3: Install Crossplane CLI**
```sh
curl -sL https://raw.githubusercontent.com/crossplane/crossplane/master/install.sh | sh
```

---

## **Part 2: Create Custom Resource Definition**

### **Step 1: Create XRD**
Create `webapp-xrd.yaml`:
```yaml
apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: webapps.example.org
spec:
  group: example.org
  names:
    kind: WebApp
    plural: webapps
  claimNames:
    kind: WebAppClaim
    plural: webappclaims
  versions:
    - name: v1alpha1
      served: true
      referenceable: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                parameters:
                  type: object
                  properties:
                    image:
                      type: string
                    replicas:
                      type: integer
                      minimum: 1
                      maximum: 5
```

### **Step 2: Create Composition**
Create `webapp-composition.yaml`:
```yaml
apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: webapps.example.org
spec:
  compositeTypeRef:
    apiVersion: example.org/v1alpha1
    kind: WebApp
  resources:
    - name: deployment
      base:
        apiVersion: apps/v1
        kind: Deployment
        spec:
          selector:
            matchLabels:
              app: webapp
          template:
            metadata:
              labels:
                app: webapp
            spec:
              containers:
                - name: webapp
                  image: ${parameters.image}
                  ports:
                    - containerPort: 80
      patches:
        - fromFieldPath: "spec.parameters.replicas"
          toFieldPath: "spec.replicas"
```

---

## **Part 3: Deploy Application**

### **Step 1: Create Claim**
Create `webapp-claim.yaml`:
```yaml
apiVersion: example.org/v1alpha1
kind: WebAppClaim
metadata:
  name: my-webapp
  namespace: default
spec:
  parameters:
    image: nginx:latest
    replicas: 2
```

### **Step 2: Apply Resources**
```sh
kubectl apply -f webapp-xrd.yaml
kubectl apply -f webapp-composition.yaml
kubectl apply -f webapp-claim.yaml
```

---

## **Part 4: Verification**

### **1. Check Resources**
```sh
kubectl get webappclaims
kubectl get deployments
kubectl get pods
```

### **2. Scale Application**
Update `webapp-claim.yaml`:
```yaml
spec:
  parameters:
    replicas: 3
```

Apply changes:
```sh
kubectl apply -f webapp-claim.yaml
```

---

## **Part 5: Cleanup**
```sh
kubectl delete -f webapp-claim.yaml
kubectl delete -f webapp-composition.yaml
kubectl delete -f webapp-xrd.yaml
kind delete cluster --name crossplane-demo
```
