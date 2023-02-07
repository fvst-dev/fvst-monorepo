/usr/bin/expect <<!

spawn railway init
expect "Project"
send "\n"
expect "name: "
send "sample\n"
expect eof

spawn railway add
expect "postgresql"
send "\n"
expect eof

sleep 5

spawn railway add
expect "mongodb"
send "\033\[B"
expect "redis"
send "\n"
expect eof

