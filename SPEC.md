# IOT Software Specification

## 1. Project Overview

IOT is a French Internet of Things project that captures, processes, and displays temperature sensor data. The system is decomposed into 3 main parts:

- **embedded**: A Raspberry Pi Pico device that collect and transmit temperature data
- **worker**: Service that receives, processes, validates, and stores sensor data
- **web**: Web application that aggregates and displays temperature data with user authentication


## 2. User Management & Security

### 2.1 Persona
- **Device Administrator**: 
  - Can view all registered devices across the system
  - Receives alerts for device conflicts and issues
  - Manages system-wide device operations

- **Device Owner**:
  - Must register a web account before registering devices
  - Can only view their own registered devices
  - Receives alerts specific to their devices

### 2.2 Authentication Requirements
- **Devices**: Must be registered and authenticated by the server
- **Users**: Must register and authenticate to access the web interface


## 3. Core Features

### 3.1 Device Management
- **Device Registration**: Devices obtain unique UUID upon registration
- **Serial Number**: Each device has a unique 16-character serial identifier
- **Authentication**: Registered devices must authenticate with the server for data transmission

### 3.2 Data Validation
- **Coherence Control**: A device cannot be in multiple zones simultaneously
- **Conflict Resolution**: When conflicts occur:
  - Warn the device administrator
  - Warn the device owner
  - Log the incident for investigation

### 3.3 Data Visualization
- **Temperature Evolution**: Display temperature trends over time periods for specific zones
- **Zone Listing**: Browse available zones with postal codes
- **Real-time Updates**: Future enhancement (not in MVP)

### 3.4 Future Features (Not in MVP)
- Real-time temperature monitoring
- Device state management (active/inactive, online/offline)
- Humidity sensor support

## 4. User Stories

- **US001**: As a device owner, I want to register my device to obtain a unique ID
- **US002**: As a device, I want to send temperature in my current zone at current time
- **US003**: As a device owner, I want to view temperature evolution in my zone over a day/period
- **US004**: As a user, I want to see a list of available zones
- **US005**: As a device administrator, I want to receive alerts when a device appears in multiple locations
- **US006**: As a device owner, I want to register a web account before registering my device


## 5. Non-functional Requirement

- **Device Capacity**: Support hundreds of concurrent devices
- **Data Volume**: Handle millions of temperature data points
- **Availability**: Worker service must be highly available
- **Scalability**: Architecture designed for independent scaling of read/write operations
