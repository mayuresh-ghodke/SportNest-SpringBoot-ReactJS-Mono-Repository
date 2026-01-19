# ---------- BUILD STAGE ----------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy parent pom and Library module
COPY pom.xml .
COPY Library ./Library
COPY Customer ./Customer

# Build only Customer module (along with Library, skip Admin/Delivery)
RUN mvn clean package -pl Customer -am -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /build/Customer/target/*.jar customer-app.jar

EXPOSE 8020

ENTRYPOINT ["java", "-jar", "customer-app.jar"]
