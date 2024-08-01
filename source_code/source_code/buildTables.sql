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

-- Add all system values here: 

-- Default Project amount limit that our system will contain.
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Servicing', 5000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Rooms And Buildings', 10000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Salary', 100000);
INSERT INTO ProjectCost(projectType, amountLimit) VALUES('Events', 65000.45);

-- Add all test values here: 
INSERT INTO AddressData (postalCode, City, Province) VALUES ('V6T1Z4', 'Vancouver', 'British Columbia');
INSERT INTO UserData (userID, firstName, lastName, SIN, address, postalCode) VALUES (1, 'user1', 'user1_l', 000111, '2205 Lower Mall', 'V6T1Z4');
INSERT INTO Manager (userID, workExperience) VALUES (1, 5);

INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (1, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Servicing');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (4, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Servicing');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (2, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 5000 ,1, 'Salary');
INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) VALUES (3, TO_DATE('2021-12-01', 'YYYY-MM-DD'), TO_DATE('2024-12-01', 'YYYY-MM-DD'), 65000 ,1, 'Events');