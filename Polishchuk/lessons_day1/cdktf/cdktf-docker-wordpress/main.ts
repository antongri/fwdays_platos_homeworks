import { App, TerraformStack } from "cdktf";
// Fixed imports - using correct class names from @cdktf/provider-docker
import { provider, container, image, network } from "@cdktf/provider-docker";
import { Construct } from "constructs";

class WordPressStack extends TerraformStack {
  constructor(scope: Construct, id: string, port: number) {
    super(scope, id);

    // Fixed: using 'provider.DockerProvider' instead of 'DockerProvider'
    new provider.DockerProvider(this, "docker", {});

    // Fixed: using 'network.Network' instead of 'Network'
    const wordpressNetwork = new network.Network(this, "network", {
      name: `wordpress-network-${id}`,
    });

    // Fixed: using 'image.Image' instead of 'Image'
    const mysqlImage = new image.Image(this, "mysql-image", {
      name: "mysql:5.7",
      keepLocally: false,
    });

    const wordpressImage = new image.Image(this, "wordpress-image", {
      name: "wordpress:latest",
      keepLocally: false,
    });

    // Fixed: using 'container.Container' instead of 'Container'
    const mysqlContainer = new container.Container(this, "mysql-container", {
      name: `mysql-${id}`,
      image: mysqlImage.name, // Fixed: using 'image' instead of 'latest'
      networksAdvanced: [{ name: wordpressNetwork.name }],
      env: [
        "MYSQL_ROOT_PASSWORD=rootpass",
        "MYSQL_DATABASE=wordpress",
        "MYSQL_USER=wpuser",
        "MYSQL_PASSWORD=wppass",
      ],
      ports: [{ internal: 3306, external: port + 1000 }],
    });

    new container.Container(this, "wordpress-container", {
      name: `wordpress-${id}`,
      image: wordpressImage.name, // Fixed: using 'image' instead of 'latest'
      networksAdvanced: [{ name: wordpressNetwork.name }],
      env: [
        // Fixed: using container name instead of service name for DB_HOST
        `WORDPRESS_DB_HOST=${mysqlContainer.name}`,
        "WORDPRESS_DB_USER=wpuser",
        "WORDPRESS_DB_PASSWORD=wppass",
        "WORDPRESS_DB_NAME=wordpress",
      ],
      ports: [{ internal: 80, external: port }],
      dependsOn: [mysqlContainer],
    });
  }
}

const app = new App();
new WordPressStack(app, "StackOne", 8081);
new WordPressStack(app, "StackTwo", 8082);
app.synth();