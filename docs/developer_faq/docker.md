# Docker

## Dockerfiles

To reduce the amount of Dockerfiles required to maintain for different frameworks we use template Dockerfiles
in `/tooling/docker` directory and the shell script [create_dockerfiles.sh](../../create_dockerfiles.sh).

The template files are representative of both Nest and Next Dockerfiles and can be reused for most applications. As such
it is more reasonable to update these files and let the shell script copy them for others.

The shell script handles copying and updating the directory names. Currently, it also takes into account if the Nest
application uses a prisma client or not.

### create_dockerfiles.sh

The script looks for a file in the application directory that is specific for the framework. Example:

- `next.config.js` for NextJS
- `nest-cli.json` for NestJS

Based on this it keeps in mind the application framework and selects the Dockerfile template in the folder.

It then renames all instances of `application_name` to the applications actual name, so Turborepo can copy the correct
files and build the right project.

```shell
cp tooling/docker/$app_type/Dockerfile "$dir/."
sed -i "" "s/application_name/$directory_name/g" "$dir/Dockerfile"
```

It also checks if it is a Nest app and has prisma in it, deleting the prisma copying if there is no client.

```shell
if [ $app_type = "nest" ] && [ ! -d "$dir/prisma" ]; then
  sed -i "" "/prisma/d" "$dir/Dockerfile"
fi
```
