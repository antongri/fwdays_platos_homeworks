package kubernetes

#ResourceName: string & =~"^[a-z0-9-]+$"
#ImageTag: string & !~":latest$"
#Labels: {
	app: string
	env: "dev" | "staging" | "prod"
}

#Deployment: {
	apiVersion: "apps/v1"
	kind:       "Deployment"
	metadata: {
		name:   #ResourceName
		labels: #Labels
	}
	spec: {
		replicas: int & >=1 & <=10
		selector: matchLabels: app: string
		template: {
			metadata: labels: app: string
			spec: containers: [...{
				name:  string
				image: #ImageTag
				ports: [...{containerPort: int}]
				resources: limits: {
					cpu:    string
					memory: string
				}
			}]
		}
	}
}

#Service: {
	apiVersion: "v1"
	kind:       "Service"
	metadata: {
		name:   #ResourceName
		labels: #Labels
	}
	spec: {
		selector: app: string
		ports: [...{
			port:       int
			targetPort: int
		}]
	}
}

#ConfigMap: {
	apiVersion: "v1"
	kind:       "ConfigMap"
	metadata: {
		name:   #ResourceName
		labels: #Labels
	}
	data: [string]: string
}

app: {
	deployment: #Deployment & {
		metadata: {
			name: "nginx-app"
			labels: {
				app: "nginx"
				env: "prod"
			}
		}
		spec: {
			replicas: 2
			selector: matchLabels: app: "nginx"
			template: {
				metadata: labels: app: "nginx"
				spec: containers: [{
					name:  "nginx"
					image: "nginx:1.21"
					ports: [{containerPort: 80}]
					resources: limits: {
						cpu:    "500m"
						memory: "512Mi"
					}
				}]
			}
		}
	}

	service: #Service & {
		metadata: {
			name: "nginx-service"
			labels: {
				app: "nginx"
				env: "prod"
			}
		}
		spec: {
			selector: app: "nginx"
			ports: [{
				port:       80
				targetPort: 80
			}]
		}
	}

	configMap: #ConfigMap & {
		metadata: {
			name: "nginx-config"
			labels: {
				app: "nginx"
				env: "prod"
			}
		}
		data: {
			"nginx.conf": "server { listen 80; }"
		}
	}
}