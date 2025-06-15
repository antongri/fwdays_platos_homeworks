package app

#metadata: {
	name:      #name
	namespace: string | *"default"
	labels:    #labels
}

#labels: {
	app:     "my-app"
	service: "my-service"
}

#name: =~"^my-app.+$"

#resources: {
	#m: "Mi"
	#c: "m"
	limits: {
		cpu:    "\(int & >=0 & <=1000 | *400)\(#c)"
		memory: "\(int & >=0 & <=2048 | *1024)\(#m)"
	}
	requests: {
		cpu:    "\(int & >=0 & <=1000 | *100)\(#c)"
		memory: "\(int & >=0 & <=2048 | *256)\(#m)"
	}
}

output: {
    "deployment": deployment
}