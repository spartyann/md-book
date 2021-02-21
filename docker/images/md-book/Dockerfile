FROM node:15

RUN apt-get update \
	&& apt-get install net-tools \
	&& apt-get clean

ENV PORT=3000
ENV DB_HOST=md-book-db
ENV DB_PORT=3306
ENV DB_PASSWORD=
ENV DB_USERNAME=root
ENV DB_DATABASE=md-book

ADD docker/images/md-book/entrypoint /entrypoint
RUN chmod a+x /entrypoint/*.sh

# Copy server and UI
ADD server /app/server
ADD ui /app/ui

# Build server
RUN cd /app/server && npm install && npm run build

# Build ui
RUN cd /app/ui && npm install && npm run build


ENTRYPOINT ["/entrypoint/entrypoint.sh"]
CMD ["node", "dist/main"]
