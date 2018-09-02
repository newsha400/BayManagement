FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/baymanagement-0.1.0.jar spring.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","spring.jar"]

