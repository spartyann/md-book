FROM node:10

RUN apt-get update \
	&& apt-get install net-tools \
	&& npm i -g @nestjs/cli \
	&& apt-get clean

ENV PORT=3000
ENV DB_HOST=md-book-db
ENV DB_PORT=3306
ENV DB_PASSWORD=
ENV DB_USERNAME=root
ENV DB_DATABASE=md-book
ENV NODE_ENV=production

ADD docker/images/md-book/entrypoint /entrypoint
RUN chmod a+x /entrypoint/*.sh

# Copy server and UI
ADD server /app/server
ADD ui /app/ui
RUN echo "VUE_APP_ENV=production" > /app/ui/.env

# Build server
RUN cd /app/server && npm install && npm run build

# Build ui
RUN cd /app/ui && npm install && npm run build


ENTRYPOINT ["/entrypoint/entrypoint.sh"]
CMD ["node", "dist/main"]
