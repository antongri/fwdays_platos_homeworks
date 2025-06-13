## 1. Install WSL2 and Ubuntu

1. Open PowerShell as Administrator and run:

   ```sh
   wsl --install
   ```

2. Restart your computer.

3. After restart, open Ubuntu from the Start Menu and set up your username and password.

## 2. Install Required Tools in WSL2

1. Update package list:

   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

2. Install required packages:

   ```sh
   sudo apt install -y \
       make \
       curl \
       git \
       golang-go \
       docker.io
   ```

3. Install kubectl:

   ```sh
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   chmod +x kubectl
   sudo mv kubectl /usr/local/bin/
   ```

4. Install Operator SDK:

   ```sh
   export ARCH=$(case $(uname -m) in x86_64) echo -n amd64 ;; aarch64) echo -n arm64 ;; *) echo -n $(uname -m) ;; esac)
   export OS=$(uname | awk '{print tolower($0)}')
   export OPERATOR_SDK_DL_URL=https://github.com/operator-framework/operator-sdk/releases/download/v1.28.0
   curl -LO ${OPERATOR_SDK_DL_URL}/operator-sdk_${OS}_${ARCH}
   chmod +x operator-sdk_${OS}_${ARCH}
   sudo mv operator-sdk_${OS}_${ARCH} /usr/local/bin/operator-sdk
   ```

5. Install Minikube:

   ```sh
   curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
   chmod +x minikube-linux-amd64
   sudo mv minikube-linux-amd64 /usr/local/bin/minikube
   ```

6. Start Docker service:

   ```sh
   sudo service docker start
   ```

7. Add your user to docker group:

   ```sh
   sudo usermod -aG docker $USER
   ```

8. Start a new shell session or run:

   ```sh
   sudo service docker start
   ```

## 3. Start Local Kubernetes Cluster

1. Start Minikube:

   ```sh
    minikube start --driver=docker
   ```

2. Verify cluster is running:

   ```sh
    kubectl cluster-info
   ```
