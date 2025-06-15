package kubernetes

#KubernetesDeployment: {
    apiVersion: "apps/v1"
    kind:       "Deployment"
    metadata: {
        name:      string
        namespace: string | *"default"
    }
    spec: {
        replicas: int & >=1 & <=10
        selector: matchLabels: {
            app: string
        }
        template: {
            metadata: labels: {
                app: string
            }
            spec: containers: [...{
                name:  string
                image: string
                ports?: [...{
                    containerPort: int & >=1 & <=65535
                }]
            }]
        }
    }
}
