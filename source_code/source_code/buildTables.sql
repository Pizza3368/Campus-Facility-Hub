DROP TABLE EventOrganizer;
DROP TABLE StaffMember;
DROP TABLE Manager;
DROP TABLE UserData;
DROP TABLE AddressData;


CREATE TABLE AddressData(
    postalCode VARCHAR(20),
    City VARCHAR(20) NOT NULL,
    Province VARCHAR(20) NOT NULL,
    PRIMARY KEY (postalCode)
);

CREATE TABLE UserData(
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

CREATE TABLE StaffMember(
    role VARCHAR(20) NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);
CREATE TABLE Manager(
    workExperience INTEGER NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);

CREATE TABLE EventOrganizer(
    organizerLevel INTEGER NOT NULL,
    userID INTEGER,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
);

INSERT INTO AddressData(postalCode, City, Province) VALUES ('V11 0X0', 'Vancouver', 'BC');

INSERT INTO UserData(userID, firstName, lastName, SIN, address, postalCode) VALUES(1, 'Jessica', 'Bator', 123321123, '666 Hello Street', 'V11 0X0');
INSERT INTO UserData(userID, firstName, lastName, SIN, address, postalCode) VALUES(2, 'Bryan', 'Chang', 890098890, '123 Bye Street', 'V11 0X0');

INSERT INTO StaffMember(role, userID) VALUES('Janitor', 1);
