echo Updating Dockerfiles

for dir in apps/*; do
  directory_name=$(basename "$dir")

  app_type="other"

  if [ -f "$dir/nest-cli.json" ]; then
    app_type="nest"
  elif [ -f "$dir/next.config.js" ]; then
    app_type="next"
  fi

  if [ $app_type = "nest" ] || [ $app_type = "next" ]; then
    echo "$app_type - Creating a Dockerfile for: $directory_name"

    cp tooling/docker/$app_type/Dockerfile "$dir/."
    sed -i "" "s/application_name/$directory_name/g" "$dir/Dockerfile"

    if [ $app_type = "nest" ] && [ ! -d "$dir/prisma" ]; then
      sed -i "" "/prisma/d" "$dir/Dockerfile"
    fi
  fi

done
