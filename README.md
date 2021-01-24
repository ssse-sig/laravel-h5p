# H5P-GitHub with Laravel

The project consists of a Laravel application integrating  the H5P library into the Laravel framework. The H5P library is currently not a module. 
H5P makes it easy to create interactive content by providing a range of content types for various needs.
H5P provides an ever growing number of content types. Think of them as templates for creating content. To use a content type you only need access to a web site where H5P has been installed and a modern web browser.
H5P content is responsive and mobile friendly, which means that users will experience the same rich, interactive content on computers, smartphones and tablets alike.
For more information visit https://h5p.org/

## **Installation**
	Install the correct version of the dependencies
	* composer install
	Enable public storage
	* php artisan storage:link
	Locate the sql file in the projects root
	* Update the database using "ddl script .sql"

## **To Do**
	* A config file which should contain:
		* Paths
		* Database tables names or prefixes
	* Static values that will need to become dynamic
		* The language is currently hardcoded as English and can't be dynamically assigned or selected
		* User rights are currently being ignored (everyone can do everything)
		* The user ID is set as 1 and not obtained dynamically .
	* The ability to edit H5P contents through the content editor
	* Improving the routes, using a new intuitive naming pattern
	
## **State of the H5P editor's development**
	* The H5P editor allows one to create new H5P contents, but the ability to modify already existing contents is currently under development. 
	
## **Other future improvements**
	* The notation used for a few values usually associated with H5P contents or libraries (examples: MajorVersion vs Major_version, MinorVersion vs Minor_version, MachineName vs Name etc) is currently not homogeneous.
	* Information is currently often being sent to the server through a standard HTTP request. The goal instead is to take advantage of Laravel's built-in Routing system.



<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>


## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel h5p library is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

