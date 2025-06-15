## ** Verification**

### **1. Check Resources**

```sh
kubectl get webappclaims
kubectl get deployments
kubectl get pods
```

![check rss](./pic/crossplate_get_rss.png)
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
![scaling](./pic/crossplate_replicas_change.png)
