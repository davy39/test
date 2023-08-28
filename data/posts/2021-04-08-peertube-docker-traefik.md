---
date: 2021-04-08T18:53:17.014Z
title: Peertube + Docker + Traefik
image : /static/images/peertube-1140x628.png
---
mkdir -p peertube/config

`nano peertube/config/poduction.yaml`

```yaml
listen:
  hostname: '0.0.0.0'
  port: 9000

webserver:
  https: true
  hostname: 'url'
  port: 443

rates_limit:
  api:
    window: 10 seconds
    max: 50
  login:
    window: 5 minutes
    max: 15
  signup:
    window: 5 minutes
    max: 2
  ask_send_email:
    window: 5 minutes
    max: 3

trust_proxy:
  - 'loopback'

database:
  hostname: 'postgres'
  port: 5432
  suffix: ''
  username: 'peertube'
  password: 'peertube'
  pool:
    max: 5

redis:
  hostname: 'redis'
  port: 6379
  auth: null
  db: 0

smtp:
  hostname: null
  port: 465 
  username: null
  password: null
  tls: true 
  disable_starttls: false
  ca_file: null
  from_address: 'admin@example.com'

email:
  body:
    signature: "PeerTube"
  subject:
    prefix: "[PeerTube]"

# From the project root directory
storage:
  tmp: './storage/tmp/' # Used to download data (imports etc), store uploaded files before processing...
  avatars: './storage/avatars/'
  videos: './storage/videos/'
  streaming_playlists: './storage/streaming-playlists/'
  redundancy: './storage/videos/'
  logs: './storage/logs/'
  previews: './storage/previews/'
  thumbnails: './storage/thumbnails/'
  torrents: './storage/torrents/'
  captions: './storage/captions/'
  cache: './storage/cache/'
  plugins: './storage/plugins/'

log:
  level: 'info'
  rotation:
    enabled : true

search:
  remote_uri:
    users: true
    anonymous: false

trending:
  videos:
    interval_days: 7 # Compute trending videos for the last x days

redundancy:
  videos:
    check_interval: '1 hour' # How often you want to check new videos to cache
    strategies: # Just uncomment strategies you want
      -
        size: '10GB'
        min_lifetime: '48 hours'
        strategy: 'most-views' # Cache videos that have the most views

csp:
  enabled: false
  report_only: true # CSP directives are still being tested, so disable the report only mode at your own risk!
  report_uri:

tracker:
  enabled: true
  private: true
  reject_too_many_announces: false

history:
  videos:
    max_age: -1

views:
  videos:
    remote:
      max_age: -1

plugins:
  index:
    enabled: true
    check_latest_versions_interval: '12 hours' # How often you want to check new plugins/themes versions
    url: 'https://packages.joinpeertube.org'

cache:
  previews:
    size: 500 # Max number of previews you want to cache
  captions:
    size: 500 # Max number of video captions/subtitles you want to cache

admin:
  email: 'peertube@email.com'

contact_form:
  enabled: true

signup:
  enabled: false
  limit: 10 # When the limit is reached, registrations are disabled. -1 == unlimited
  requires_email_verification: false
  filters:
    cidr: # You can specify CIDR ranges to whitelist (empty = no filtering) or blacklist
      whitelist: []
      blacklist: []

user:
  video_quota: -1
  video_quota_daily: -1

transcoding:
  enabled: true
  allow_additional_extensions: true
  allow_audio_files: true
  threads: 1
  resolutions: # Only created if the original video has a higher resolution, uses more storage!
    240p: false
    360p: false
    480p: false
    720p: false
    1080p: false
    2160p: false
  hls:
    enabled: false

import:
  videos:
    http: # Classic HTTP or all sites supported by youtube-dl https://rg3.github.io/youtube-dl/supportedsites.html
      enabled: false
    torrent: # Magnet URI or torrent file (use classic TCP/UDP/WebSeed to download the file)
      enabled: false

auto_blacklist:
  videos:
    of_users:
      enabled: false

instance:
  name: 'PeerTube'
  short_description: 'PeerTube, a federated (ActivityPub) video streaming platform using P2P (BitTorrent) directly in the web browser with WebTorrent and Angular.'
  description: 'Peertube' # Support markdown
  terms: '' # Support markdown
  default_client_route: '/videos/trending'
  is_nsfw: false
  default_nsfw_policy: 'do_not_list'
  customizations:
    javascript: '' # Directly your JavaScript code (without <script> tags). Will be eval at runtime
    css: '' # Directly your CSS code (without <style> tags). Will be injected at runtime
  robots: |
    User-agent: *
    Disallow:
  securitytxt:
    "# If you would like to report a security issue\n# you may report it to:\nContact: https://github.com/Chocobozzz/PeerTube/blob/develop/SECURITY.md\nContact: mailto:"

services:
  twitter:
    username: '@*****' # Indicates the Twitter account for the website or platform on which the content was published
    whitelisted: false

followers:
  instance:
    enabled: true
    manual_approval: false

theme:
  default: 'dark'
```

`nano peertube/docker-compose.yml`

```yaml
version: "3.5"

services:

  peertube:
    image: chocobozzz/peertube:production-stretch
    volumes:
      - data:/data
      - ./config:/config
    depends_on:
      - postgres
      - redis
    restart: "always"
    networks:
      - 'web'
      - 'peertube'
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.peertube.entrypoints=web"
      - "traefik.http.routers.peertube.rule=Host(`url`)"
      #- "traefik.http.routers.peertube.middlewares=https-redirect@file"
      #- "traefik.http.routers.peertube-secure.middlewares=secured@file"
      - "traefik.http.routers.peertube-secure.entrypoints=websecure"
      - "traefik.http.routers.peertube-secure.rule=Host(`url`)"
      - "traefik.http.routers.peertube-secure.tls=true"
      - "traefik.http.routers.peertube-secure.tls.certresolver=default"
      - "traefik.http.routers.peertube-secure.service=peertube"
      - "traefik.http.services.peertube.loadbalancer.server.port=9000"
      - "traefik.docker.network=web"

  postgres:
    image: postgres
    environment:
      POSTGRES_USER: peertube
      POSTGRES_PASSWORD: peertube
      POSTGRES_DB: peertube
    volumes:
      - db:/var/lib/postgresql/data
    restart: "always"
    networks:
      - 'peertube'
    labels:
      traefik.enable: "false"

  redis:
    image: redis
    volumes:
      - redis:/data
    restart: "always"
    networks:
      - 'peertube'
    labels:
      traefik.enable: "false"

networks:
  web:
    external:
      name: web
  peertube:

volumes:
  data: {}
  db: {}
  redis: {}
```

`cd peertube`

`sudo docker-compose up -d`

Pour définir le mot de passe de l'admin (root) :

`sudo docker exec -it peertube_peertube_1 /bin/bash NODE_CONFIG_DIR=/config NODE_ENV=production npm run reset-password -- -u root`

https://www.aukfood.fr/peertube-dockerise-avec-traefik-2/
