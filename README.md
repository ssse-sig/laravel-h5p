
<p align="center"><a href="https://github.com/ssse-sig/laravel-h5p" target="_blank"><img src="https://github.com/ssse-sig/laravel-h5p/blob/main/public/LogoH5pLaravel.png" width="800"></a></p>

# H5P with Laravel

The project consists of a Laravel application integrating  the H5P library into the Laravel framework.
The H5P library is currently not a module. 
H5P makes it easy to create interactive content by providing a range of content types for various needs.
H5P provides an ever growing number of content types. Think of them as templates for creating content.
To use a content type you only need access to a web site where H5P has been installed and a modern web browser.
H5P content is responsive and mobile friendly, which means that users will experience the same rich,
interactive content on computers, smartphones and tablets alike.
For more information visit https://h5p.org/

## Installation from scratch 
Install the correct version of the dependencies: ```composer install```

Enable public storage: ```php artisan storage:link```

Laravel key generate: ```php artisan key:generate```

Locate the sql file in the projects root and update the database using ```ddl script .sql```

You can use this routes: ```php artisan route:list```

## Integration in a existing project
You can copy the ```app/View/Components``` and ```public/h5p``` folders, and set the routes according to the rules of the file https://github.com/ssse-sig/laravel-h5p/blob/main/routes/web.php.

## To Do
- Make the repository a composer package instead of a Laravel application 
- A config file which should contain:
	- Paths
	- Database tables names or prefixes
- Static values that will need to become dynamic
	- The language is currently hardcoded as English and can't be dynamically assigned or selected
	- User rights are currently being ignored (everyone can do everything)
	- The user ID is set as 1 and not obtained dynamically .
- The ability to edit H5P contents through the content editor
- Improving the routes, using a new intuitive naming pattern
	
## State of the H5P editor's development
- The H5P editor allows one to create new H5P contents, but the ability to modify already existing
contents is currently under development. 
	
## Other future improvements
- The notation used for a few values usually associated with H5P contents or libraries 
(examples: MajorVersion vs Major_version, MinorVersion vs Minor_version, MachineName vs Name etc) 
is currently not homogeneous.
- Information is currently often being sent to the server through a standard HTTP request. The goal
instead is to take advantage of Laravel's built-in Routing system.

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail. All security vulnerabilities will be promptly addressed.

## License

The Laravel h5p library is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

