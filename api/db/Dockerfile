FROM postgres:15-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=shift_planner

HEALTHCHECK --interval=5s --timeout=5s --retries=5 \
  CMD pg_isready -U postgres
