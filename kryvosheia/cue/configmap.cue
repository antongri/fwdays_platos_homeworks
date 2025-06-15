package app

#environmet_params: {
	dev: {
		param1: "dev"
		param2: 10
	}
	prod: {
		param1: "prod"
		param2: 50
	}
}

#configmap: {
	apiVersion: "v1"
	kind:       "ConfigMap"
	metadata:   #metadata
	data: {...}
}

configmaps: {
	for k, v in #environmet_params {
		"\(k)": #configmap & {
			metadata: {
				name: "my-app-\(k)"
			}
			data: {
				param1: v.param1
				param2: v.param2
			}
		}
	}
}
