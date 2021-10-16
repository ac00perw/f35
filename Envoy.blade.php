@servers(['local' => ['127.0.0.1'], 'production' => ['seamus@209.208.109.247']])

@setup
    $vars=[
        'localdir' => '/Users/a/Sites/f35/dist/',
        'remote' =>  "seamus@209.208.109.247",
        'remotedir' => "/var/www/woodenreckord.com/html/",
        'rsyncflags' => " -e 'ssh -p30' ",
        ];
    $count = 0;
@endsetup

@story('deploy')
    checkvariables
    help
    deployer
@endstory

@story('deploycontent')
    checkvariables
    help
    deploy-contents
@endstory

@story('synccontent')
    checkvariables
    help
    sync-contents
@endstory

@task('npmrunprod', ['on' => 'local'])
    npm run -s prod
@endtask

@task('checkvariables', ['on' => 'local'])

    @foreach($vars as $var)
        @if( empty($var) )
            {{ $count +=1 }}
        @endif
    @endforeach
    @if($count > 0)
        echo 'Please define local variables';
        exit 1;
    @else
        echo '--- Variable Definitions ---\nremote = {{ $vars['remote'] }}'
        echo 'remotedir = {{ $vars['remotedir'] }}'
        echo 'localdir = {{ $vars['localdir'] }}'
        echo 'rsyncflags = {{ $vars['rsyncflags'] }}'
    @endif
        echo ' === '
@endtask

@task('help', ['on' => 'local'])
    echo "envoy run deploy : Rsync {{ $vars['localdir'] }} -->> remote"
    echo " ===  "
@endtask

@task('deployer', ['on' => 'local'])
    echo 'rsync {{ $vars['remote'] }}:{{ $vars['remotedir'] }}'
    cd {{ $vars['localdir'] }}
    rsync -avz {{ $vars['rsyncflags'] }} ./  {{ $vars['remote'] }}:{{ $vars['remotedir'] }}
    sleep 1
@endtask

