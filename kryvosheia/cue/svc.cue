apiVersion: "v1"
kind:       "Service"
metadata: name: "my-service"
spec: ports: [{
	name:       "http"
	protocol:   "TCP"
	port:       80
	targetPort: 9376
}]
