drop user zipuser@localhost;
create user zipuser@localhost identified by '38E23C51-D699-4B6A-A1CB-30C81B82B48F';
grant select on zips.* to zipuser@localhost;

