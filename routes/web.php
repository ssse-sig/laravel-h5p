<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Invio dei risultati dopo il completamento di un contenuto H5P
Route::post('/writeresults', 'Controller@writeResultsInDB');
// Ritorna un Json contenente tutti dati riguardanti un contenuto H5P (dati del database)
Route::get('/1/{id}', 'Controller@test');
// Mostra un contenuto H5P
Route::get('/2/{id}', 'Controller@test2');
// Mostra l'editor H5P
Route::get('/3', 'Controller@showHub');
// TO DO: Mostra l'editor H5P per la modifica di un contenuto
Route::get('/edit', 'Controller@editContent');
// TO DO: rotta in cui vengono inviati i dati del form di modifica di un contenuto.
Route::post('/edit', 'Controller@editContentPost');
// route di invio dati creazione nuovo content
Route::post('/3', 'Controller@newContent');
// Elimina il contenuto corrispondente all'id inviato
Route::get('/delete', 'Controller@deleteContent');
// Invia le informazioni necessarie alla generazione dei form H5P
Route::get('/ajax', 'Controller@ajax_content_editor');
Route::post('/ajax', 'Controller@ajax_content_editor');
//Route::get('/ajax_libraries', 'Controller@ajax_libraries_call');
// Mostra una semplice finestra di gestione contenente la lista dei contenuti H5P esistenti.
Route::get('/contents', 'Controller@contents');

//Route::get('/', function () {
//    return view('welcome');
//});
