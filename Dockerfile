FROM gradle:8-jdk21 AS build

WORKDIR /app


COPY build.gradle .
COPY settings.gradle .

RUN gradle dependencies

COPY . .

RUN gradle build -x test


FROM eclipse-temurin:21-jdk

WORKDIR /app
# Install Python, GCC, G++, Node.js
RUN apt-get update && \
    apt-get install -y \
    python3 \
    gcc \
    g++ \
    nodejs \
    npm && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080


ENTRYPOINT ["java","-jar","app.jar"]