# ---------- BUILD STAGE ----------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy Library (shared code) and Customer module
COPY Library ./Library
COPY Customer ./Customer

# Copy only the parent POM needed for Library & Customer
COPY pom.xml .

# Build Customer module directly (ignoring Admin/Delivery)
RUN mvn -f Customer/pom.xml clean package -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the built Customer JAR
COPY --from=builder /build/Customer/target/*.jar customer-app.jar

# Expose the Customer port
EXPOSE 8020

# Start the Customer service
ENTRYPOINT ["java", "-jar", "customer-app.jar"]
