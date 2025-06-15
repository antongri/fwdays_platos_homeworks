package app

#Service: {
	close({
		apiVersion: "v1"
		kind:       "Service"
		metadata:   #metadata
		spec: {
			ports: [...close({
				name!:     string
				protocol!: "TCP" | "UDP"
				port!:     int
				targetPort!: matchN(>=1, [int, string])
			})]
			...
		}
	})
}

service: #Service & {
	metadata: {
		name: "my-app-service"
	}
	spec: {
		ports: [{
			name:       "http"
			protocol:   "TCP"
			port:       80
			targetPort: 9356
		}]
	}
}
