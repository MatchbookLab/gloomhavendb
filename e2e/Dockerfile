FROM cypress/base:10

WORKDIR /test/

# this is adapted from https://github.com/cypress-io/cypress-docker-images/blob/master/browsers/chrome67-ff57/Dockerfile
USER root

RUN node --version

RUN echo "force new browser versions: |"

# install Chrome
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y dbus-x11 google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# Firefox is not yet supported, see: https://github.com/cypress-io/cypress/issues/1096
## install Firefox
#RUN export FIREFOX_VERSION=$(curl -s https://product-details.mozilla.org/1.0/firefox_versions.json | grep LATEST_FIREFOX_VERSION | cut -d '"' -f4); \
#  wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 \
#  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
#  && rm /tmp/firefox.tar.bz2 \
#  && ln -fs /opt/firefox/firefox /usr/bin/firefox

# Add zip utility - it comes in very handy
RUN apt-get update && apt-get install -y zip

# versions of local tools
RUN node -v
RUN npm -v
RUN yarn -v
RUN google-chrome --version
# RUN firefox --version
RUN zip --version
RUN git --version

# a few environment variables to make NPM installs easier
# good colors for most applications
ENV TERM xterm
# avoid million NPM install messages
ENV npm_config_loglevel warn
# allow installing when the main user is root
ENV npm_config_unsafe_perm true
# end Cypress Dockerfile

# can't remember why I originally added this, but lately, it's been causing some readable-stream issues...
# RUN npm install -g npm

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY ./ ./

CMD echo "Don't 'docker-compose up,' run 'docker-compose -f docker-compose.yml -f docker-compose.no-cdn.yml -f docker-compose.test.yml run --rm e2e npm test -- --browser chrome'"
