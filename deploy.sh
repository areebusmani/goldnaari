server_flag=false
dashboard_flag=false
landing_flag=false
all_flag=false

while getopts "sdlha" opt; do
    case $opt in
        s)
            server_flag=true
            ;;
        d)
            dashboard_flag=true
            ;;
        l)
            landing_flag=true
            ;;
        a)
            all_flag=true
            ;;
        h)
            echo "Usage: ./deploy.sh [options]"
            echo "Options:"
            echo "  -s : Deploy server"
            echo "  -d : Deploy dashboard"
            echo "  -l : Deploy landing page"
            echo "  -a : Deploy all"
            echo "  -h : Display this help message"
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG"
            exit 1
            ;;
    esac
done

if $server_flag || $all_flag; then
    scp -P21098 ./app.js goldtdtx@server329.web-hosting.com:~/goldnaari/app.mjs
    scp -r -P21098 ./api goldtdtx@server329.web-hosting.com:~/goldnaari/
    scp -P21098 ./package.json goldtdtx@server329.web-hosting.com:~/goldnaari/package.json
    echo "Server deployed. Please restart the server manually before installing dependencies if required"
fi

if $dashboard_flag || $all_flag; then
    scp -r -P21098 ./dashboard/build goldtdtx@server329.web-hosting.com:~/goldnaari/dashboard/
    echo "Dashboard deployed"
fi

if $landing_flag || $all_flag; then
    scp -r -P21098 ./landing goldtdtx@server329.web-hosting.com:~/goldnaari/
    echo "Landing page deployed"
fi

# ssh goldtdtx@server329.web-hosting.com -p21098
