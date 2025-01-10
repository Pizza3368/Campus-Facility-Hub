DROP TABLE ServiceContracts;
DROP TABLE CompanyInformations;
DROP TABLE Budget;
DROP TABLE ProjectCost;
DROP TABLE EventOrganizer;
DROP TABLE StaffMember;
DROP TABLE Manager;
DROP TABLE UserData;
DROP TABLE AddressData;

CREATE TABLE AddressData
(
    postalCode VARCHAR(20),
    City VARCHAR(20) NOT NULL,
    Province VARCHAR(20) NOT NULL,
    PRIMARY KEY (postalCode)
);


CREATE TABLE UserData
(
    userID INTEGER,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    SIN INTEGER NOT NULL UNIQUE,
    address VARCHAR(40) NOT NULL,
    postalCode VARCHAR(20),
    PRIMARY KEY (userID),
    FOREIGN KEY (postalCode) REFERENCES AddressData (postalCode)
    ON DELETE SET NULL
);

CREATE TABLE Manager
(
    workExperience INTEGER NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);

CREATE TABLE StaffMember
(
    role VARCHAR(20) NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);

CREATE TABLE EventOrganizer
(
    organizerLevel INTEGER NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);

CREATE TABLE ProjectCost
(
    projectType VARCHAR(20),
    amountLimit Decimal(10,2),
    PRIMARY KEY(ProjectType)
);

CREATE TABLE Budget
(
    budgetID INTEGER,
    startDate Date,
    endDate Date,
    amount Decimal(10,2),
    managerID INTEGER NOT NULL,
    projectType VARCHAR(20),
    PRIMARY KEY (budgetID),
    FOREIGN KEY (managerID) REFERENCES Manager(userID) ON DELETE CASCADE,
    FOREIGN KEY (projectType) REFERENCES ProjectCost(projectType) ON DELETE SET NULL
);

CREATE TABLE CompanyInformations(
	companyName VARCHAR(20),
	companyRating INTEGER NOT NULL,
	PRIMARY KEY (companyName)
);


CREATE TABLE ServiceContracts(
    serviceID INTEGER, 
    staffMemberID INTEGER,
    companyName VARCHAR(50) NOT NULL, 
    cost DECIMAL(10, 2), 
    PRIMARY KEY (serviceID),
    FOREIGN KEY (staffMemberID) REFERENCES StaffMember(userID) ON DELETE SET NULL,
    FOREIGN KEY (companyName) REFERENCES CompanyInformations (companyName) ON DELETE CASCADE
);


-- Add all system values here: 
INSERT INTO CompanyInformations(companyName, companyRating) VALUES ('Facebook', 1);
INSERT INTO CompanyInformations(companyName, companyRating) VALUES ('Tesla', 4);
INSERT INTO CompanyInformations(companyName, companyRating) VALUES ('Google', 1);
INSERT INTO CompanyInformations(companyName, companyRating) VALUES ('Sierra', 3);
INSERT INTO CompanyInformations(companyName, companyRating) VALUES ('BC Hydro', 3);


-- Default Project amount limit that our system will contain.
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Servicing', 5000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Rooms And Buildings', 10000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Salary', 100000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Events', 65000.45);

-- Add all test values here: 
INSERT INTO AddressData (postalCode, City, Province) VALUES ('V6T1Z4', 'Vancouver', 'British Columbia');
INSERT INTO UserData (userID, firstName, lastName, SIN, address, postalCode) VALUES (1, 'user1', 'user1_l', 000111, '2205 Lower Mall', 'V6T1Z4');
INSERT INTO Manager (userID, workExperience) VALUES (1, 5);
INSERT INTO UserData (userID, firstName, lastName, SIN, address, postalCode) VALUES (2, 'user2', 'user1_l', 000222, '2205 Lower Mall', 'V6T1Z4');
INSERT INTO StaffMember (userID, role) VALUES (2, 'test');

INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (1, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Servicing');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (4, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Servicing');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (2, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Salary');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (3, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 65000 ,1, 'Events');

INSERT INTO ServiceContracts(serviceID, staffMemberID, companyName, cost) VALUES (1, 2, 'Facebook', 1000.00);
INSERT INTO ServiceContracts(serviceID, staffMemberID, companyName, cost) VALUES (2, 2, 'Tesla', 999.99);
INSERT INTO ServiceContracts(serviceID, staffMemberID, companyName, cost) VALUES (3, 2, 'Google', 99.99);
INSERT INTO ServiceContracts(serviceID, staffMemberID, companyName, cost) VALUES (4, 2, 'Sierra', 4444.44);
INSERT INTO ServiceContracts(serviceID, staffMemberID, companyName, cost) VALUES (5, 2, 'BC Hydro', 3333.33);

