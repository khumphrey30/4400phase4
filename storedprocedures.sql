-- CS4400: Introduction to Database Systems (Fall 2024)
-- Project Phase III: Stored Procedures SHELL [v3] Thursday, Nov 7, 2024
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

use business_supply;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [1] add_owner()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new owner.  A new owner must have a unique
username. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_owner;
delimiter //
create procedure add_owner (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date)
sp_main: begin
    if exists (select 1 from users where username = ip_username) then
        leave sp_main;
    else
        insert into users (username, first_name, last_name, address, birthdate)
        values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);

        insert into business_owners (username) values (ip_username);
    end if;
end //
delimiter ;

-- [2] add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employee without any designated driver or
worker roles.  A new employee must have a unique username and a unique tax identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
delimiter //
create procedure add_employee (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date,
    in ip_taxID varchar(40), in ip_hired date, in ip_employee_experience integer,
    in ip_salary integer)
sp_main: begin
    if exists (select 1 from users where username = ip_username) then
        leave sp_main;
    elseif exists (select 1 from employees where taxID = ip_taxID) then
        leave sp_main;
    else
        insert into users (username, first_name, last_name, address, birthdate)
        values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);

        insert into employees (username, taxID, hired, experience, salary)
        values (ip_username, ip_taxID, ip_hired, ip_employee_experience, ip_salary);
    end if;
end //
delimiter ;

-- [3] add_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the driver role to an existing employee.  The
employee/new driver must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_driver_role;
delimiter //
create procedure add_driver_role (in ip_username varchar(40), in ip_licenseID varchar(40),
	in ip_license_type varchar(40), in ip_driver_experience integer)
sp_main: begin
    declare employee_exists int default 0;
    declare is_worker int default 0;
    declare license_unique int default 0;

    select count(*) into employee_exists
    from employees
    where username = ip_username;

    if employee_exists = 0 then
        leave sp_main;
    end if;

    select count(*) into is_worker
    from workers
    where username = ip_username;

    if is_worker > 0 then
        leave sp_main;
    end if;

    select count(*) into license_unique
    from drivers
    where licenseID = ip_licenseID;

    if license_unique > 0 then
        leave sp_main;
    end if;

    insert into drivers (username, licenseID, license_type, successful_trips)
    values (ip_username, ip_licenseID, ip_license_type, ip_driver_experience);
end //
delimiter ;

-- [4] add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
delimiter //
create procedure add_worker_role (in ip_username varchar(40))
sp_main: begin
    if not exists (select 1 from employees where username = ip_username) then
        leave sp_main;
    elseif exists (select 1 from drivers where username = ip_username) then
        leave sp_main;
    else
        insert into workers (username)
        values (ip_username);
    end if;
end //
delimiter ;

-- [5] add_product()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new product.  A new product must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_product;
delimiter //
create procedure add_product (in ip_barcode varchar(40), in ip_name varchar(100),
	in ip_weight integer)
sp_main: begin
    if exists (select 1 from products where barcode = ip_barcode) then
        leave sp_main;
    else
        insert into products (barcode, iname, weight)
        values (ip_barcode, ip_name, ip_weight);
    end if;
end //
delimiter ;

-- [6] add_van()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new van.  A new van must be assigned 
to a valid delivery service and must have a unique tag.  Also, it must be driven
by a valid driver initially (i.e., driver works for the same service). And the van's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_van;
delimiter //
create procedure add_van (in ip_id varchar(40), in ip_tag integer, in ip_fuel integer,
	in ip_capacity integer, in ip_sales integer, in ip_driven_by varchar(40))
sp_main: begin
    declare home_base_location varchar(40);

    if not exists (select 1 from delivery_services where id = ip_id) then
        leave sp_main;
    elseif exists (select 1 from vans where id = ip_id and tag = ip_tag) then
        leave sp_main;
    elseif not exists (select 1 from drivers where username = ip_driven_by) then
        leave sp_main;
    else
        select home_base into home_base_location
        from delivery_services
        where id = ip_id;

        insert into vans (id, tag, fuel, capacity, sales, driven_by, located_at)
        values (ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_driven_by, home_base_location);
    end if;
end //
delimiter ;

-- [7] add_business()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new business.  A new business must have a
unique (long) name and must exist at a valid location, and have a valid rating.
And a resturant is initially "independent" (i.e., no owner), but will be assigned
an owner later for funding purposes. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_business;
delimiter //
create procedure add_business (in ip_long_name varchar(40), in ip_rating integer,
	in ip_spent integer, in ip_location varchar(40))
sp_main: begin
    if exists (select 1 from businesses where long_name = ip_long_name) then
        leave sp_main;
    elseif not exists (select 1 from locations where label = ip_location) then
        leave sp_main;
    elseif ip_rating < 1 or ip_rating > 5 then
        leave sp_main;
    else
        insert into businesses (long_name, rating, spent, location)
        values (ip_long_name, ip_rating, ip_spent, ip_location);
    end if;
end //
delimiter ;

-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service.  A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
delimiter //
create procedure add_service (in ip_id varchar(40), in ip_long_name varchar(100),
	in ip_home_base varchar(40), in ip_manager varchar(40))
sp_main: begin
    if exists (select 1 from delivery_services where id = ip_id) then
        leave sp_main;
    elseif not exists (select 1 from locations where label = ip_home_base) then
        leave sp_main;
    elseif not exists (select 1 from workers where username = ip_manager) then
        leave sp_main;
    else
        insert into delivery_services (id, long_name, home_base, manager)
        values (ip_id, ip_long_name, ip_home_base, ip_manager);
    end if;
end //
delimiter ;

-- [9] add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid van
destination.  A new location must have a unique combination of coordinates. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
delimiter //
create procedure add_location (in ip_label varchar(40), in ip_x_coord integer,
	in ip_y_coord integer, in ip_space integer)
sp_main: begin
    if exists (select 1 from locations where label = ip_label) then
        leave sp_main;
    elseif exists (select 1 from locations where x_coord = ip_x_coord and y_coord = ip_y_coord) then
        leave sp_main;
    else
        insert into locations (label, x_coord, y_coord, space)
        values (ip_label, ip_x_coord, ip_y_coord, ip_space);
    end if;
end //
delimiter ;

-- [10] start_funding()
-- -----------------------------------------------------------------------------
/* This stored procedure opens a channel for a business owner to provide funds
to a business. The owner and business must be valid. */
-- -----------------------------------------------------------------------------
drop procedure if exists start_funding;
delimiter //
create procedure start_funding (in ip_owner varchar(40), in ip_amount integer, in ip_long_name varchar(40), in ip_fund_date date)
sp_main: begin
    if not exists (select 1 from business_owners where username = ip_owner) then
        signal sqlstate '45000' set message_text = 'Owner does not exist';
        leave sp_main;
    else if not exists (select 1 from businesses where long_name = ip_long_name) then
        signal sqlstate '45000' set message_text = 'Business does not exist';
        leave sp_main;
    else
        insert into fund (username, invested, invested_date, business)
        values (ip_owner, ip_amount, ip_fund_date, ip_long_name);
        if row_count() = 0 then
            signal sqlstate '45000' 
            set message_text = 'Insert operation failed.';
        end if;
    end if;
end //
delimiter ;

-- [11] hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires a worker to work for a delivery service.
If a worker is actively serving as manager for a different service, then they are
not eligible to be hired.  Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
delimiter //
create procedure hire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    if exists (select 1 from work_for where username = ip_username and id = ip_id) then
        leave sp_main;
    elseif not exists (select 1 from workers where username = ip_username) then
        leave sp_main;
    elseif not exists (select 1 from delivery_services where id = ip_id) then
        leave sp_main;
    elseif exists (select 1 from delivery_services where manager = ip_username and id != ip_id) then
        leave sp_main;
    else
        insert into work_for (username, id)
        values (ip_username, ip_id);
    end if;
end //
delimiter ;

-- [12] fire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure fires a worker who is currently working for a delivery
service.  The only restriction is that the employee must not be serving as a manager 
for the service. Otherwise, the firing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists fire_employee;
delimiter //
create procedure fire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    if not exists (select 1 from work_for where username = ip_username and id = ip_id) then
        leave sp_main;
    elseif exists (select 1 from delivery_services where id = ip_id and manager = ip_username) then
        leave sp_main;
    else
        delete from work_for where username = ip_username and id = ip_id;
    end if;
end //
delimiter ;

-- [13] manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints a worker who is currently hired by a delivery
service as the new manager for that service.  The only restrictions is that
the worker must not be working for any other delivery service. Otherwise, the appointment 
to manager is permitted.  The current manager is simply replaced. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
delimiter //
create procedure manage_service (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    if not exists (select 1 from work_for where username = ip_username and id = ip_id) then
        leave sp_main;
    elseif exists (select 1 from work_for where username = ip_username and id != ip_id) then
        leave sp_main;
    else
        update delivery_services
        set manager = ip_username
        where id = ip_id;
    end if;
end //
delimiter ;

-- [14] takeover_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid driver to take control of a van owned by 
the same delivery service. The current controller of the van is simply relieved 
of those duties. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_van;
delimiter //
create procedure takeover_van (in ip_username varchar(40), in ip_id varchar(40),
	in ip_tag integer)
sp_main: begin
    if not exists (select 1 from drivers where username = ip_username) then
        leave sp_main;
    elseif exists (select 1 from vans v where v.driven_by = ip_username and v.id != ip_id) then
        leave sp_main;
    elseif not exists (select 1 from vans where id = ip_id and tag = ip_tag) then
        leave sp_main;
    else
        update vans
        set driven_by = ip_username
        where id = ip_id and tag = ip_tag;
    end if;
end //
delimiter ;

-- [15] load_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific product to a van's payload so that we can sell them for some
specific price to other businesses.  The van can only be loaded if it's located
at its delivery service's home base, and the van must have enough capacity to
carry the increased number of items.

The change/delta quantity value must be positive, and must be added to the quantity
of the product already loaded onto the van as applicable.  And if the product
already exists on the van, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_van;
delimiter //
create procedure load_van (in ip_id varchar(40), in ip_tag integer, in ip_barcode varchar(40),
	in ip_more_packages integer, in ip_price integer)
sp_main: begin
    declare van_capacity integer;
    declare current_quantity integer default 0;

    if not exists (select 1 from vans where id = ip_id and tag = ip_tag) then
        leave sp_main;
    elseif not exists (select 1 from products where barcode = ip_barcode) then
        leave sp_main;
    elseif not exists (select 1 from vans v join delivery_services ds on v.id = ds.id 
        where v.id = ip_id and v.tag = ip_tag and v.located_at = ds.home_base) then
        leave sp_main;
    elseif ip_more_packages <= 0 then
        leave sp_main;
    else
        select capacity, ifnull(quantity, 0) into van_capacity, current_quantity
        from vans v
        left join contain c on v.id = c.id and v.tag = c.tag and c.barcode = ip_barcode
        where v.id = ip_id and v.tag = ip_tag;

        if (van_capacity < (current_quantity + ip_more_packages)) then
            leave sp_main;
        else
            if current_quantity > 0 then
                update contain
                set quantity = quantity + ip_more_packages
                where id = ip_id and tag = ip_tag and barcode = ip_barcode;
            else
                insert into contain (id, tag, barcode, quantity, price)
                values (ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
            end if;
        end if;
    end if;
end //
delimiter ;

-- [16] refuel_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a van. The van can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_van;
delimiter //
create procedure refuel_van (in ip_id varchar(40), in ip_tag integer, in ip_more_fuel integer)
sp_main: begin
	-- ensure van exists
    if not exists (select 1 from vans where id = ip_id and tag = ip_tag) then
        leave sp_main;
	-- ensure van is located at home base
    elseif not exists (select 1 from vans v join delivery_services ds on v.id = ds.id 
        where v.id = ip_id and v.tag = ip_tag and v.located_at = ds.home_base) then
        leave sp_main;
	-- ensure fuel is not negative
		-- elseif ip_more_fuel <= 0 then
        -- leave sp_main;
    else
        update vans
        set fuel = fuel + ip_more_fuel
        where id = ip_id and tag = ip_tag;
    end if;
end //
delimiter ;

-- [17] drive_van()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single van to a new
location (i.e., destination). This will also update the respective driver's 
experience and van's fuel. The main constraints on the van(s) being able to 
move to a new  location are fuel and space.  A van can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base.  And a van can only move to a destination if there's enough
space remaining at the destination. */
-- -----------------------------------------------------------------------------
drop function if exists fuel_required;
delimiter //
create function fuel_required (ip_departure varchar(40), ip_arrival varchar(40))
	returns integer reads sql data
begin
	if (ip_departure = ip_arrival) then return 0;
    else return (select 1 + truncate(sqrt(power(arrival.x_coord - departure.x_coord, 2) + power(arrival.y_coord - departure.y_coord, 2)), 0) as fuel
		from (select x_coord, y_coord from locations where label = ip_departure) as departure,
        (select x_coord, y_coord from locations where label = ip_arrival) as arrival);
	end if;
end //
delimiter ;

drop procedure if exists drive_van;
delimiter //
create procedure drive_van (in ip_id varchar(40), in ip_tag integer, in ip_destination varchar(40))
sp_main: begin
    declare current_location varchar(40);
    if ip_destination not in (select label from locations) then leave sp_main; end if;
    if ip_destination = (select located_at from vans where id=ip_id and tag=ip_tag) then leave sp_main; end if;
    if (select fuel from vans where id=ip_id and tag=ip_tag) < (select fuel_required((select located_at from vans where id=ip_id and tag=ip_tag), 
    ip_destination)) +
    (select fuel_required(ip_destination, (select home_base from delivery_services where id=ip_id))) then leave sp_main; end if;
    if ((select space from locations where label=ip_destination) - (select count(*) from vans where located_at=ip_destination)) <= 0 then leave sp_main;
    end if;

    update drivers set successful_trips = successful_trips + 1 where username=(select driven_by from vans where id=ip_id and tag=ip_tag);
    select located_at into current_location from vans where id=ip_id and tag=ip_tag;
    update vans set fuel=fuel-(select fuel_required(current_location, ip_destination)) where id=ip_id and tag=ip_tag;
    update vans set located_at = ip_destination where id=ip_id and tag=ip_tag;

end //
delimiter ;

-- [18] purchase_product()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a business to purchase products from a van
at its current location.  The van must have the desired quantity of the product
being purchased.  And the business must have enough money to purchase the
products.  If the transaction is otherwise valid, then the van and business
information must be changed appropriately.  Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_product;
delimiter //
create procedure purchase_product (in ip_long_name varchar(40), in ip_id varchar(40),
	in ip_tag integer, in ip_barcode varchar(40), in ip_quantity integer)
sp_main: begin
    if ip_long_name not in (select long_name from businesses) then leave sp_main; end if;

    if (ip_id, ip_tag) not in (select id, tag from vans) then leave sp_main; end if;
    if (ip_id, ip_tag) not in 
    (select id, tag from vans where located_at = 
    (select location from businesses where long_name = ip_long_name)) then leave sp_main; end if;

    if ip_quantity > (select quantity from contain 
        where id = ip_id and tag = ip_tag and barcode = ip_barcode) then leave sp_main; end if;

    update contain
    set quantity = quantity - ip_quantity
    where id = ip_id and tag = ip_tag and barcode = ip_barcode;

    update vans
    set sales = sales + coalesce((ip_quantity * (select price from contain where id = ip_id and tag = ip_tag and barcode = ip_barcode)), 0)
    where id = ip_id and tag = ip_tag;

    update businesses
    set spent = spent + coalesce((ip_quantity * (select price from contain where id = ip_id and tag = ip_tag and barcode = ip_barcode)), 0)
    where long_name = ip_long_name;

    delete from contain where quantity = 0;
end //
delimiter ;

-- [19] remove_product()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a product from the system.  The removal can
occur if, and only if, the product is not being carried by any vans. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_product;
delimiter //
create procedure remove_product (in ip_barcode varchar(40))
sp_main: begin
    if not exists (select 1 from products where barcode = ip_barcode) then
        leave sp_main;
    elseif exists (select 1 from contain where barcode = ip_barcode) then
        leave sp_main;
    else
        delete from products where barcode = ip_barcode;
    end if;
end //
delimiter ;

-- [20] remove_van()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a van from the system.  The removal can
occur if, and only if, the van is not carrying any products.*/
-- -----------------------------------------------------------------------------
drop procedure if exists remove_van;
delimiter //
create procedure remove_van (in ip_id varchar(40), in ip_tag integer)
sp_main: begin
    if not exists (select 1 from vans where id = ip_id and tag = ip_tag) then
        leave sp_main;
    elseif exists (select 1 from contain where id = ip_id and tag = ip_tag) then
        leave sp_main;
    else
        delete from vans where id = ip_id and tag = ip_tag;
    end if;
end //
delimiter ;

-- [21] remove_driver_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a driver from the system.  The removal can
occur if, and only if, the driver is not controlling any vans.  
The driver's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_driver_role;
delimiter //
create procedure remove_driver_role (in ip_username varchar(40))
sp_main: begin
    if not exists (select 1 from drivers where username = ip_username) then
        leave sp_main;
    elseif exists (select 1 from vans where driven_by = ip_username) then
        leave sp_main;
    else
        delete from drivers where username = ip_username;

        delete from employees where username = ip_username;
        delete from users where username = ip_username;
    end if;
end //
delimiter ;

-- [22] display_owner_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an owner.
For each owner, it includes the owner's information, along with the number of
businesses for which they provide funds and the number of different places where
those businesses are located.  It also includes the highest and lowest ratings
for each of those businesses, as well as the total amount of debt based on the
monies spent purchasing products by all of those businesses. And if an owner
doesn't fund any businesses then display zeros for the highs, lows and debt. */
-- -----------------------------------------------------------------------------
create or replace view display_owner_view as
select 
    u.username,
    u.first_name,
    u.last_name,
    u.address,
    count(distinct f.business) as num_businesses,
    count(distinct b.location) as num_places,
    coalesce(max(b.rating), 0) as highs,
    coalesce(min(b.rating), 0) as lows,
    coalesce(sum(b.spent), 0) as debt
from 
    users u
join 
    business_owners bo on u.username = bo.username
left join 
    fund f on bo.username = f.username
left join 
    businesses b on f.business = b.long_name
group by 
    u.username, u.first_name, u.last_name, u.address;
    
-- [23] display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an employee.
For each employee, it includes the username, tax identifier, salary, hiring date and
experience level, along with license identifer and driving experience (if applicable,
'n/a' if not), and a 'yes' or 'no' depending on the manager status of the employee. */
-- -----------------------------------------------------------------------------
create or replace view display_employee_view as
select 
    e.username,
    e.taxid,
    e.salary,
    e.hired,
    e.experience as employee_experience,
    coalesce(d.licenseid, 'n/a') as licenseid,
    coalesce(d.successful_trips, 'n/a') as driving_experience,
    case 
        when ds.manager is not null then 'yes'
        else 'no'
    end as manager_status
from 
    employees e
left join 
    drivers d on e.username = d.username
left join 
    delivery_services ds on e.username = ds.manager;
    
-- [24] display_driver_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a driver.
For each driver, it includes the username, licenseID and drivering experience, along
with the number of vans that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view display_driver_view as
select 
    d.username,
    d.licenseID,
    d.successful_trips,
    count(v.id) as vans_controlled
from 
    drivers d
left join 
    vans v on d.username = v.driven_by
group by 
    d.username, d.licenseID, d.successful_trips;
    
-- [25] display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
name of the business or service at that location, the number of vans as well as 
the identifiers of the vans at the location (sorted by the tag), and both the 
total and remaining capacity at the location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select 
    loc.label,
    coalesce(bus.long_name, ds.long_name) as long_name,
    loc.x_coord,
    loc.y_coord,
    loc.space,
    count(v.id) as num_vans,
    group_concat(concat(v.id, v.tag) order by v.tag separator ',') as van_ids,
    loc.space - count(v.id) as remaining_capacity
from 
    locations loc
left join 
    businesses bus on loc.label = bus.location
left join 
    delivery_services ds on loc.label = ds.home_base
join 
    vans v on loc.label = v.located_at
group by 
    loc.label, long_name, loc.x_coord, loc.y_coord, loc.space;
    
-- [26] display_product_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the products.
For each product that is being carried by at least one van, it includes a list of
the various locations where it can be purchased, along with the total number of packages
that can be purchased and the lowest and highest prices at which the product is being
sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_product_view as
select 
    p.iname as product_name,
    l.label as location,
    sum(c.quantity) as amount_available,
    min(c.price) as low_price,
    max(c.price) as high_price
from 
    products p
join 
    contain c on p.barcode = c.barcode
join 
    vans v on c.id = v.id and c.tag = v.tag
join 
    locations l on v.located_at = l.label
group by 
    p.iname, l.label;

-- [27] display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service.  It includes the identifier, name, home base location and manager for the
service, along with the total sales from the vans.  It must also include the number
of unique products along with the total cost and weight of those products being
carried by the vans. */
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW display_service_view AS
SELECT 
    ds.id, 
    ds.long_name, 
    ds.home_base, 
    ds.manager, 
    (SELECT SUM(v.sales) FROM vans v WHERE v.id = ds.id) AS revenue,
    COUNT(DISTINCT c.barcode) AS products_carried,
    SUM(c.quantity * c.price) AS cost_carried,
    SUM(c.quantity * p.weight) AS weight_carried
FROM 
    delivery_services ds
LEFT JOIN 
    vans v ON ds.id = v.id
LEFT JOIN 
    contain c ON v.id = c.id AND v.tag = c.tag
LEFT JOIN 
    products p ON c.barcode = p.barcode
GROUP BY 
    ds.id, ds.long_name, ds.home_base, ds.manager;
