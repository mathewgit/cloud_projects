# Jenkins Docker EC2 CI/CD Project

A beginner-friendly DevOps CI/CD project that deploys a simple Dockerized web app from GitHub to an AWS EC2 Ubuntu server using Jenkins.

## What this project demonstrates

- Jenkins running on an EC2 Ubuntu server
- Jenkins pulling code from GitHub
- Jenkins building a Docker image
- Jenkins replacing the running container with a new version
- GitHub webhook triggering Jenkins automatically after each push

## Folder name

```text
02_Jenkins_Docker_EC2_CICD
```

## Project structure

```text
02_Jenkins_Docker_EC2_CICD/
├── app/
│   ├── index.html
│   └── nginx.conf
├── Dockerfile
├── Jenkinsfile
├── README.md
└── .gitignore
```

## Files overview

- `app/index.html` serves a simple HTML page
- `app/nginx.conf` configures Nginx to serve the page on port 80
- `Dockerfile` builds the Nginx image for the app
- `Jenkinsfile` defines the CI/CD pipeline stages
- `.gitignore` excludes local junk and env files

## Local Docker test

Build the image:

```bash
docker build -t project02-nginx-app .
```

Run the container:

```bash
docker rm -f project02-container || true
docker run -d -p 8001:80 --name project02-container project02-nginx-app
```

Open:

```text
http://localhost:8001
```

Stop it:

```bash
docker rm -f project02-container
```

## Jenkins pipeline flow

```text
GitHub push
   -> GitHub webhook
   -> Jenkins job starts
   -> Docker image build
   -> Old container removed
   -> New container started on port 8001
```

## Typical EC2 setup outline

1. Launch an Ubuntu EC2 instance.
2. Install Docker and Jenkins.
3. Allow inbound traffic on ports `8080` for Jenkins and `8001` for the app.
4. Connect GitHub to Jenkins.
5. Configure a webhook in GitHub to hit Jenkins after each push.

## GitHub commands

```bash
git init
git add .
git commit -m "Initial commit for Jenkins Docker EC2 CI/CD project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/02_Jenkins_Docker_EC2_CICD.git
git push -u origin main
```

## Remote SSH from VS Code

Example SSH command:

```bash
ssh -i ~/Downloads/docker.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

In VS Code:

```text
Cmd + Shift + P
Remote-SSH: Connect to Host
```

## Suggested VS Code extensions

- Docker
- Jenkins Pipeline Linter Connector
- YAML
- GitHub Pull Requests
- Remote - SSH