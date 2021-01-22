<?php

namespace App\View\Components;

use Illuminate\View\Component;

class H5PValidator extends Component
 {
    public $h5pF;
    public $h5pC;

    // Schemas used to validate the h5p files
    private $h5pRequired = array(
        'title' => '/^.{1,255}$/',
        'language' => '/^[-a-zA-Z]{1,10}$/',
        'preloadedDependencies' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
        'mainLibrary' => '/^[$a-z_][0-9a-z_\.$]{1,254}$/i',
        'embedTypes' => array('iframe', 'div'),
    );

    private $h5pOptional = array(
        'contentType' => '/^.{1,255}$/',
        'dynamicDependencies' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
        // deprecated
        'author' => '/^.{1,255}$/',
        'authors' => array(
            'name' => '/^.{1,255}$/',
            'role' => '/^\w+$/',
        ),
        'source' => '/^(http[s]?:\/\/.+)$/',
        'license' => '/^(CC BY|CC BY-SA|CC BY-ND|CC BY-NC|CC BY-NC-SA|CC BY-NC-ND|CC0 1\.0|GNU GPL|PD|ODC PDDL|CC PDM|U|C)$/',
        'licenseVersion' => '/^(1\.0|2\.0|2\.5|3\.0|4\.0)$/',
        'licenseExtras' => '/^.{1,5000}$/',
        'yearsFrom' => '/^([0-9]{1,4})$/',
        'yearsTo' => '/^([0-9]{1,4})$/',
        'changes' => array(
            'date' => '/^[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{1,2}:[0-9]{2}:[0-9]{2}$/',
            'author' => '/^.{1,255}$/',
            'log' => '/^.{1,5000}$/'
        ),
        'authorComments' => '/^.{1,5000}$/',
        'w' => '/^[0-9]{1,4}$/',
        'h' => '/^[0-9]{1,4}$/',
        // deprecated
        'metaKeywords' => '/^.{1,}$/',
        // deprecated
        'metaDescription' => '/^.{1,}$/',
    );

    // Schemas used to validate the library files
    private $libraryRequired = array(
        'title' => '/^.{1,255}$/',
        'majorVersion' => '/^[0-9]{1,5}$/',
        'minorVersion' => '/^[0-9]{1,5}$/',
        'patchVersion' => '/^[0-9]{1,5}$/',
        'name' => '/^[\w0-9\-\.]{1,255}$/i',
        'runnable' => '/^(0|1)$/',
    );

    private $libraryOptional  = array(
        'author' => '/^.{1,255}$/',
        'license' => '/^(cc-by|cc-by-sa|cc-by-nd|cc-by-nc|cc-by-nc-sa|cc-by-nc-nd|pd|cr|MIT|GPL1|GPL2|GPL3|MPL|MPL2)$/',
        'description' => '/^.{1,}$/',
        'metadataSettings' => array(
            'disable' => '/^(0|1)$/',
            'disableExtraTitleField' => '/^(0|1)$/'
        ),
        'dynamicDependencies' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
        'preloadedDependencies' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
        'editorDependencies' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
        'preloaded_js' => array(
            'path' => '/^((\\\|\/)?[a-z_\-\s0-9\.]+)+\.js$/i',
        ),
        'preloaded_css' => array(
            'path' => '/^((\\\|\/)?[a-z_\-\s0-9\.]+)+\.css$/i',
        ),
        'dropLibraryCss' => array(
            'name' => '/^[\w0-9\-\.]{1,255}$/i',
        ),
        'w' => '/^[0-9]{1,4}$/',
        'h' => '/^[0-9]{1,4}$/',
        'embedTypes' => array('iframe', 'div'),
        'fullscreen' => '/^(0|1)$/',
        'coreApi' => array(
            'major_version' => '/^[0-9]{1,5}$/',
            'minor_version' => '/^[0-9]{1,5}$/',
        ),
    );

    /**
     * Constructor for the H5PValidator
     *
     * @param H5PFrameworkInterface $H5PFramework
     *  The frameworks implementation of the H5PFrameworkInterface
     * @param H5PCore $H5PCore
     */
    public function __construct($H5PFramework, $H5PCore) {
        $this->h5pF = $H5PFramework;
        $this->h5pC = $H5PCore;
        $this->h5pCV = new H5PContentValidator($this->h5pF, $this->h5pC);
    }

    /**
     * Validates a .h5p file
     *
     * @param bool $skipContent
     * @param bool $upgradeOnly
     * @return bool TRUE if the .h5p file is valid
     * TRUE if the .h5p file is valid
     */
    public function isValidPackage($skipContent = FALSE, $upgradeOnly = FALSE) {
        // Check dependencies, make sure Zip is present
        if (!class_exists('ZipArchive')) {
            $this->h5pF->setErrorMessage($this->h5pF->t('Your PHP version does not support ZipArchive.'), 'zip-archive-unsupported');
            unlink($tmpPath);
            return FALSE;
        }
        if (!extension_loaded('mbstring')) {
            $this->h5pF->setErrorMessage($this->h5pF->t('The mbstring PHP extension is not loaded. H5P need this to function properly'), 'mbstring-unsupported');
            unlink($tmpPath);
            return FALSE;
        }

        // Create a temporary dir to extract package in.
        $tmpDir = $this->h5pF->getUploadedH5pFolderPath();
        $tmpPath = $this->h5pF->getUploadedH5pPath();

        // Only allow files with the .h5p extension:
        if (strtolower(substr($tmpPath, -3)) !== 'h5p') {
            $this->h5pF->setErrorMessage($this->h5pF->t('The file you uploaded is not a valid HTML5 Package (It does not have the .h5p file extension)'), 'missing-h5p-extension');
            unlink($tmpPath);
            return FALSE;
        }

        // Extract and then remove the package file.
        $zip = new ZipArchive;

        // Open the package
        if ($zip->open($tmpPath) !== TRUE) {
            $this->h5pF->setErrorMessage($this->h5pF->t('The file you uploaded is not a valid HTML5 Package (We are unable to unzip it)'), 'unable-to-unzip');
            unlink($tmpPath);
            return FALSE;
        }

        if ($this->h5pC->disableFileCheck !== TRUE) {
            list($contentWhitelist, $contentRegExp) = $this->getWhitelistRegExp(FALSE);
            list($libraryWhitelist, $libraryRegExp) = $this->getWhitelistRegExp(TRUE);
        }
        $canInstall = $this->h5pC->mayUpdateLibraries();

        $valid = TRUE;
        $libraries = array();

        $totalSize = 0;
        $mainH5pExists = FALSE;
        $contentExists = FALSE;

        // Check for valid file types, JSON files + file sizes before continuing to unpack.
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $fileStat = $zip->statIndex($i);

            if (!empty($this->h5pC->maxFileSize) && $fileStat['size'] > $this->h5pC->maxFileSize) {
                // Error file is too large
                $this->h5pF->setErrorMessage($this->h5pF->t('One of the files inside the package exceeds the maximum file size allowed. (%file %used > %max)', array('%file' => $fileStat['name'], '%used' => ($fileStat['size'] / 1048576) . ' MB', '%max' => ($this->h5pC->maxFileSize / 1048576) . ' MB')), 'file-size-too-large');
                $valid = FALSE;
            }
            $totalSize += $fileStat['size'];

            $fileName = mb_strtolower($fileStat['name']);
            if (preg_match('/(^[\._]|\/[\._])/', $fileName) !== 0) {
                continue; // Skip any file or folder starting with a . or _
            }
            elseif ($fileName === 'h5p.json') {
                $mainH5pExists = TRUE;
            }
            elseif ($fileName === 'content/content.json') {
                $contentExists = TRUE;
            }
            elseif (substr($fileName, 0, 8) === 'content/') {
                // This is a content file, check that the file type is allowed
                if ($skipContent === FALSE && $this->h5pC->disableFileCheck !== TRUE && !preg_match($contentRegExp, $fileName)) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('File "%filename" not allowed. Only files with the following extensions are allowed: %files-allowed.', array('%filename' => $fileStat['name'], '%files-allowed' => $contentWhitelist)), 'not-in-whitelist');
                    $valid = FALSE;
                }
            }
            elseif ($canInstall && strpos($fileName, '/') !== FALSE) {
                // This is a library file, check that the file type is allowed
                if ($this->h5pC->disableFileCheck !== TRUE && !preg_match($libraryRegExp, $fileName)) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('File "%filename" not allowed. Only files with the following extensions are allowed: %files-allowed.', array('%filename' => $fileStat['name'], '%files-allowed' => $libraryWhitelist)), 'not-in-whitelist');
                    $valid = FALSE;
                }

                // Further library validation happens after the files are extracted
            }
        }

        if (!empty($this->h5pC->maxTotalSize) && $totalSize > $this->h5pC->maxTotalSize) {
            // Error total size of the zip is too large
            $this->h5pF->setErrorMessage($this->h5pF->t('The total size of the unpacked files exceeds the maximum size allowed. (%used > %max)', array('%used' => ($totalSize / 1048576) . ' MB', '%max' => ($this->h5pC->maxTotalSize / 1048576) . ' MB')), 'total-size-too-large');
            $valid = FALSE;
        }

        if ($skipContent === FALSE) {
            // Not skipping content, require two valid JSON files from the package
            if (!$contentExists) {
                $this->h5pF->setErrorMessage($this->h5pF->t('A valid content folder is missing'), 'invalid-content-folder');
                $valid = FALSE;
            }
            else {
                $contentJsonData = $this->getJson($tmpPath, $zip, 'content/content.json'); // TODO: Is this case-senstivie?
                if ($contentJsonData === NULL) {
                    return FALSE; // Breaking error when reading from the archive.
                }
                elseif ($contentJsonData === FALSE) {
                    $valid = FALSE; // Validation error when parsing JSON
                }
            }

            if (!$mainH5pExists) {
                $this->h5pF->setErrorMessage($this->h5pF->t('A valid main h5p.json file is missing'), 'invalid-h5p-json-file');
                $valid = FALSE;
            }
            else {
                $mainH5pData = $this->getJson($tmpPath, $zip, 'h5p.json', TRUE);
                if ($mainH5pData === NULL) {
                    return FALSE; // Breaking error when reading from the archive.
                }
                elseif ($mainH5pData === FALSE) {
                    $valid = FALSE; // Validation error when parsing JSON
                }
                elseif (!$this->isValidH5pData($mainH5pData, 'h5p.json', $this->h5pRequired, $this->h5pOptional)) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('The main h5p.json file is not valid'), 'invalid-h5p-json-file'); // Is this message a bit redundant?
                    $valid = FALSE;
                }
            }
        }

        if (!$valid) {
            // If something has failed during the initial checks of the package
            // we will not unpack it or continue validation.
            $zip->close();
            unlink($tmpPath);
            return FALSE;
        }

        // Extract the files from the package
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $fileName = $zip->statIndex($i)['name'];

            if (preg_match('/(^[\._]|\/[\._])/', $fileName) !== 0) {
                continue; // Skip any file or folder starting with a . or _
            }

            $isContentFile = (substr($fileName, 0, 8) === 'content/');
            $isFolder = (strpos($fileName, '/') !== FALSE);

            if ($skipContent !== FALSE && $isContentFile) {
                continue; // Skipping any content files
            }

            if (!($isContentFile || ($canInstall && $isFolder))) {
                continue; // Not something we want to unpack
            }

            // Get file stream
            $fileStream = $zip->getStream($fileName);
            if (!$fileStream) {
                // This is a breaking error, there's no need to continue. (the rest of the files will fail as well)
                $this->h5pF->setErrorMessage($this->h5pF->t('Unable to read file from the package: %fileName', array('%fileName' => $fileName)), 'unable-to-read-package-file');
                $zip->close();
                unlink($path);
                H5PCore::deleteFileTree($tmpDir);
                return FALSE;
            }

            // Use file interface to allow overrides
            $this->h5pC->fs->saveFileFromZip($tmpDir, $fileName, $fileStream);

            // Clean up
            if (is_resource($fileStream)) {
                fclose($fileStream);
            }
        }

        // We're done with the zip file, clean up the stuff
        $zip->close();
        unlink($tmpPath);

        if ($canInstall) {
            // Process and validate libraries using the unpacked library folders
            $files = scandir($tmpDir);
            foreach ($files as $file) {
                $filePath = $tmpDir . '/' . $file;

                if ($file === '.' || $file === '..' || $file === 'content' || !is_dir($filePath)) {
                    continue; // Skip
                }

                $libraryH5PData = $this->getLibraryData($file, $filePath, $tmpDir);
                if ($libraryH5PData === FALSE) {
                    $valid = FALSE;
                    continue; // Failed, but continue validating the rest of the libraries
                }

                // Library's directory name must be:
                // - <name>
                //     - or -
                // - <name>-<major_version>.<minor_version>
                // where name, major_version and minor_version is read from library.json
                if ($libraryH5PData['name'] !== $file && H5PCore::libraryToString($libraryH5PData, TRUE) !== $file) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('Library directory name must match name or name-major_version.minor_version (from library.json). (Directory: %directoryName , name: %name, major_version: %major_version, minor_version: %minor_version)', array(
                        '%directoryName' => $file,
                        '%name' => $libraryH5PData['name'],
                        '%major_version' => $libraryH5PData['major_version'],
                        '%minor_version' => $libraryH5PData['minor_version'])), 'library-directory-name-mismatch');
                    $valid = FALSE;
                    continue; // Failed, but continue validating the rest of the libraries
                }

                $libraryH5PData['uploadDirectory'] = $filePath;
                $libraries[H5PCore::libraryToString($libraryH5PData)] = $libraryH5PData;
            }
        }

        if ($valid) {
            if ($upgradeOnly) {
                // When upgrading, we only add the already installed libraries, and
                // the new dependent libraries
                $upgrades = array();
                foreach ($libraries as $libString => &$library) {
                    // Is this library already installed?
                    if ($this->h5pF->getLibraryId($library['name']) !== FALSE) {
                        $upgrades[$libString] = $library;
                    }
                }
                while ($missingLibraries = $this->getMissingLibraries($upgrades)) {
                    foreach ($missingLibraries as $libString => $missing) {
                        $library = $libraries[$libString];
                        if ($library) {
                            $upgrades[$libString] = $library;
                        }
                    }
                }

                $libraries = $upgrades;
            }

            $this->h5pC->librariesJsonData = $libraries;

            if ($skipContent === FALSE) {
                $this->h5pC->mainJsonData = $mainH5pData;
                $this->h5pC->contentJsonData = $contentJsonData;
                $libraries['mainH5pData'] = $mainH5pData; // Check for the dependencies in h5p.json as well as in the libraries
            }

            $missingLibraries = $this->getMissingLibraries($libraries);
            foreach ($missingLibraries as $libString => $missing) {
                if ($this->h5pC->getLibraryId($missing, $libString)) {
                    unset($missingLibraries[$libString]);
                }
            }

            if (!empty($missingLibraries)) {
                // We still have missing libraries, check if our main library has an upgrade (BUT only if we has content)
                $mainDependency = NULL;
                if (!$skipContent && !empty($mainH5pData)) {
                    foreach ($mainH5pData['preloadedDependencies'] as $dep) {
                        if ($dep['name'] === $mainH5pData['mainLibrary']) {
                            $mainDependency = $dep;
                        }
                    }
                }

                if ($skipContent || !$mainDependency || !$this->h5pF->libraryHasUpgrade(array(
                        'name' => $mainDependency['name'],
                        'major_version' => $mainDependency['major_version'],
                        'minor_version' => $mainDependency['minor_version']
                    ))) {
                    foreach ($missingLibraries as $libString => $library) {
                        $this->h5pF->setErrorMessage($this->h5pF->t('Missing required library @library', array('@library' => $libString)), 'missing-required-library');
                        $valid = FALSE;
                    }
                    if (!$this->h5pC->mayUpdateLibraries()) {
                        $this->h5pF->setInfoMessage($this->h5pF->t("Note that the libraries may exist in the file you uploaded, but you're not allowed to upload new libraries. Contact the site administrator about this."));
                        $valid = FALSE;
                    }
                }
            }
        }
        if (!$valid) {
            H5PCore::deleteFileTree($tmpDir);
        }
        return $valid;
    }

    /**
     * Help read JSON from the archive
     *
     * @param string $path
     * @param ZipArchive $zip
     * @param string $file
     * @return mixed JSON content if valid, FALSE for invalid, NULL for breaking error.
     */
    private function getJson($path, $zip, $file, $assoc = FALSE) {
        // Get stream
        $stream = $zip->getStream($file);
        if (!$stream) {
            // Breaking error, no need to continue validating.
            $this->h5pF->setErrorMessage($this->h5pF->t('Unable to read file from the package: %fileName', array('%fileName' => $file)), 'unable-to-read-package-file');
            $zip->close();
            unlink($path);
            return NULL;
        }

        // Read data
        $contents = '';
        while (!feof($stream)) {
            $contents .= fread($stream, 2);
        }

        // Decode the data
        $json = json_decode($contents, $assoc);
        if ($json === NULL) {
            // JSON cannot be decoded or the recursion limit has been reached.
            $this->h5pF->setErrorMessage($this->h5pF->t('Unable to parse JSON from the package: %fileName', array('%fileName' => $file)), 'unable-to-parse-package');
            return FALSE;
        }

        // All OK
        return $json;
    }

    /**
     * Help retrieve file type regexp whitelist from plugin.
     *
     * @param bool $isLibrary Separate list with more allowed file types
     * @return string RegExp
     */
    private function getWhitelistRegExp($isLibrary) {
        $whitelist = $this->h5pF->getWhitelist($isLibrary, H5PCore::$defaultContentWhitelist, H5PCore::$defaultLibraryWhitelistExtras);
        return array($whitelist, '/\.(' . preg_replace('/ +/i', '|', preg_quote($whitelist)) . ')$/i');
    }

    /**
     * Validates a H5P library
     *
     * @param string $file
     *  Name of the library folder
     * @param string $filePath
     *  Path to the library folder
     * @param string $tmpDir
     *  Path to the temporary upload directory
     * @return boolean|array
     *  H5P data from library.json and semantics if the library is valid
     *  FALSE if the library isn't valid
     */
    public function getLibraryData($file, $filePath, $tmpDir) {
        if (preg_match('/^[\w0-9\-\.]{1,255}$/i', $file) === 0) {
            $this->h5pF->setErrorMessage($this->h5pF->t('Invalid library name: %name', array('%name' => $file)), 'invalid-library-name');
            return FALSE;
        }
        $h5pData = $this->getJsonData($filePath . '/' . 'library.json');
        if ($h5pData === FALSE) {
            $this->h5pF->setErrorMessage($this->h5pF->t('Could not find library.json file with valid json format for library %name', array('%name' => $file)), 'invalid-library-json-file');
            return FALSE;
        }

        // validate json if a semantics file is provided
        $semanticsPath = $filePath . '/' . 'semantics.json';
        if (file_exists($semanticsPath)) {
            $semantics = $this->getJsonData($semanticsPath, TRUE);
            if ($semantics === FALSE) {
                $this->h5pF->setErrorMessage($this->h5pF->t('Invalid semantics.json file has been included in the library %name', array('%name' => $file)), 'invalid-semantics-json-file');
                return FALSE;
            }
            else {
                $h5pData['semantics'] = $semantics;
            }
        }

        // validate language folder if it exists
        $languagePath = $filePath . '/' . 'language';
        if (is_dir($languagePath)) {
            $languageFiles = scandir($languagePath);
            foreach ($languageFiles as $languageFile) {
                if (in_array($languageFile, array('.', '..'))) {
                    continue;
                }
                if (preg_match('/^(-?[a-z]+){1,7}\.json$/i', $languageFile) === 0) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('Invalid language file %file in library %library', array('%file' => $languageFile, '%library' => $file)), 'invalid-language-file');
                    return FALSE;
                }
                $languageJson = $this->getJsonData($languagePath . '/' . $languageFile, TRUE);
                if ($languageJson === FALSE) {
                    $this->h5pF->setErrorMessage($this->h5pF->t('Invalid language file %languageFile has been included in the library %name', array('%languageFile' => $languageFile, '%name' => $file)), 'invalid-language-file');
                    return FALSE;
                }
                $parts = explode('.', $languageFile); // $parts[0] is the language code
                $h5pData['language'][$parts[0]] = $languageJson;
            }
        }

        // Check for icon:
        $h5pData['hasIcon'] = file_exists($filePath . '/' . 'icon.svg');

        $validLibrary = $this->isValidH5pData($h5pData, $file, $this->libraryRequired, $this->libraryOptional);

        //$validLibrary = $this->h5pCV->validateContentFiles($filePath, TRUE) && $validLibrary;

        if (isset($h5pData['preloaded_js'])) {
            $validLibrary = $this->isExistingFiles($h5pData['preloaded_js'], $tmpDir, $file) && $validLibrary;
        }
        if (isset($h5pData['preloaded_css'])) {
            $validLibrary = $this->isExistingFiles($h5pData['preloaded_css'], $tmpDir, $file) && $validLibrary;
        }
        if ($validLibrary) {
            return $h5pData;
        }
        else {
            return FALSE;
        }
    }

    /**
     * Use the dependency declarations to find any missing libraries
     *
     * @param array $libraries
     *  A multidimensional array of libraries keyed with name first and major_version second
     * @return array
     *  A list of libraries that are missing keyed with name and holds objects with
     *  name, major_version and minor_version properties
     */
    private function getMissingLibraries($libraries) {
        $missing = array();
        foreach ($libraries as $library) {
            if (isset($library['preloadedDependencies'])) {
                $missing = array_merge($missing, $this->getMissingDependencies($library['preloadedDependencies'], $libraries));
            }
            if (isset($library['dynamicDependencies'])) {
                $missing = array_merge($missing, $this->getMissingDependencies($library['dynamicDependencies'], $libraries));
            }
            if (isset($library['editorDependencies'])) {
                $missing = array_merge($missing, $this->getMissingDependencies($library['editorDependencies'], $libraries));
            }
        }
        return $missing;
    }

    /**
     * Helper function for getMissingLibraries, searches for dependency required libraries in
     * the provided list of libraries
     *
     * @param array $dependencies
     *  A list of objects with name, major_version and minor_version properties
     * @param array $libraries
     *  An array of libraries keyed with name
     * @return
     *  A list of libraries that are missing keyed with name and holds objects with
     *  name, major_version and minor_version properties
     */
    private function getMissingDependencies($dependencies, $libraries) {
        $missing = array();
        foreach ($dependencies as $dependency) {
            $libString = H5PCore::libraryToString($dependency);
            if (!isset($libraries[$libString])) {
                $missing[$libString] = $dependency;
            }
        }
        return $missing;
    }

    /**
     * Figure out if the provided file paths exists
     *
     * Triggers error messages if files doesn't exist
     *
     * @param array $files
     *  List of file paths relative to $tmpDir
     * @param string $tmpDir
     *  Path to the directory where the $files are stored.
     * @param string $library
     *  Name of the library we are processing
     * @return boolean
     *  TRUE if all the files excists
     */
    private function isExistingFiles($files, $tmpDir, $library) {
        foreach ($files as $file) {
            $path = str_replace(array('/', '\\'), '/', $file['path']);
            if (!file_exists($tmpDir . '/' . $library . '/' . $path)) {
                $this->h5pF->setErrorMessage($this->h5pF->t('The file "%file" is missing from library: "%name"', array('%file' => $path, '%name' => $library)), 'library-missing-file');
                return FALSE;
            }
        }
        return TRUE;
    }

    /**
     * Validates h5p.json and library.json data
     *
     * Error messages are triggered if the data isn't valid
     *
     * @param array $h5pData
     *  h5p data
     * @param string $library_name
     *  Name of the library we are processing
     * @param array $required
     *  Validation pattern for required properties
     * @param array $optional
     *  Validation pattern for optional properties
     * @return boolean
     *  TRUE if the $h5pData is valid
     */
    private function isValidH5pData($h5pData, $library_name, $required, $optional) {
        $valid = $this->isValidRequiredH5pData($h5pData, $required, $library_name);
        $valid = $this->isValidOptionalH5pData($h5pData, $optional, $library_name) && $valid;

        // Check the library's required API version of Core.
        // If no requirement is set this implicitly means 1.0.
        if (isset($h5pData['coreApi']) && !empty($h5pData['coreApi'])) {
            if (($h5pData['coreApi']['major_version'] > H5PCore::$coreApi['major_version']) ||
                ( ($h5pData['coreApi']['major_version'] == H5PCore::$coreApi['major_version']) &&
                    ($h5pData['coreApi']['minor_version'] > H5PCore::$coreApi['minor_version']) )) {

                $this->h5pF->setErrorMessage(
                    $this->h5pF->t('The system was unable to install the <em>%component</em> component from the package, it requires a newer version of the H5P plugin. This site is currently running version %current, whereas the required version is %required or higher. You should consider upgrading and then try again.',
                        array(
                            '%component' => (isset($h5pData['title']) ? $h5pData['title'] : $library_name),
                            '%current' => H5PCore::$coreApi['major_version'] . '.' . H5PCore::$coreApi['minor_version'],
                            '%required' => $h5pData['coreApi']['major_version'] . '.' . $h5pData['coreApi']['minor_version']
                        )
                    ),
                    'api-version-unsupported'
                );

                $valid = false;
            }
        }

        return $valid;
    }

    /**
     * Helper function for isValidH5pData
     *
     * Validates the optional part of the h5pData
     *
     * Triggers error messages
     *
     * @param array $h5pData
     *  h5p data
     * @param array $requirements
     *  Validation pattern
     * @param string $library_name
     *  Name of the library we are processing
     * @return boolean
     *  TRUE if the optional part of the $h5pData is valid
     */
    private function isValidOptionalH5pData($h5pData, $requirements, $library_name) {
        $valid = TRUE;

        foreach ($h5pData as $key => $value) {
            if (isset($requirements[$key])) {
                $valid = $this->isValidRequirement($value, $requirements[$key], $library_name, $key) && $valid;
            }
            // Else: ignore, a package can have parameters that this library doesn't care about, but that library
            // specific implementations does care about...
        }

        return $valid;
    }

    /**
     * Validate a requirement given as regexp or an array of requirements
     *
     * @param mixed $h5pData
     *  The data to be validated
     * @param mixed $requirement
     *  The requirement the data is to be validated against, regexp or array of requirements
     * @param string $library_name
     *  Name of the library we are validating(used in error messages)
     * @param string $property_name
     *  Name of the property we are validating(used in error messages)
     * @return boolean
     *  TRUE if valid, FALSE if invalid
     */
    private function isValidRequirement($h5pData, $requirement, $library_name, $property_name) {
        $valid = TRUE;

        if (is_string($requirement)) {
            if ($requirement == 'boolean') {
                if (!is_bool($h5pData)) {
                    $this->h5pF->setErrorMessage($this->h5pF->t("Invalid data provided for %property in %library. Boolean expected.", array('%property' => $property_name, '%library' => $library_name)));
                    $valid = FALSE;
                }
            }
            else {
                // The requirement is a regexp, match it against the data
                if (is_string($h5pData) || is_int($h5pData)) {
                    if (preg_match($requirement, $h5pData) === 0) {
                        $this->h5pF->setErrorMessage($this->h5pF->t("Invalid data provided for %property in %library", array('%property' => $property_name, '%library' => $library_name)));
                        $valid = FALSE;
                    }
                }
                else {
                    $this->h5pF->setErrorMessage($this->h5pF->t("Invalid data provided for %property in %library", array('%property' => $property_name, '%library' => $library_name)));
                    $valid = FALSE;
                }
            }
        }
        elseif (is_array($requirement)) {
            // We have sub requirements
            if (is_array($h5pData)) {
                if (is_array(current($h5pData))) {
                    foreach ($h5pData as $sub_h5pData) {
                        $valid = $this->isValidRequiredH5pData($sub_h5pData, $requirement, $library_name) && $valid;
                    }
                }
                else {
                    $valid = $this->isValidRequiredH5pData($h5pData, $requirement, $library_name) && $valid;
                }
            }
            else {
                $this->h5pF->setErrorMessage($this->h5pF->t("Invalid data provided for %property in %library", array('%property' => $property_name, '%library' => $library_name)));
                $valid = FALSE;
            }
        }
        else {
            $this->h5pF->setErrorMessage($this->h5pF->t("Can't read the property %property in %library", array('%property' => $property_name, '%library' => $library_name)));
            $valid = FALSE;
        }
        return $valid;
    }

    /**
     * Validates the required h5p data in libraray.json and h5p.json
     *
     * @param mixed $h5pData
     *  Data to be validated
     * @param array $requirements
     *  Array with regexp to validate the data against
     * @param string $library_name
     *  Name of the library we are validating (used in error messages)
     * @return boolean
     *  TRUE if all the required data exists and is valid, FALSE otherwise
     */
    private function isValidRequiredH5pData($h5pData, $requirements, $library_name) {
        $valid = TRUE;
        foreach ($requirements as $required => $requirement) {
            if (is_int($required)) {
                // We have an array of allowed options
                return $this->isValidH5pDataOptions($h5pData, $requirements, $library_name);
            }
            if (isset($h5pData[$required])) {
                $valid = $this->isValidRequirement($h5pData[$required], $requirement, $library_name, $required) && $valid;
            }
            else {
                $this->h5pF->setErrorMessage($this->h5pF->t('The required property %property is missing from %library', array('%property' => $required, '%library' => $library_name)), 'missing-required-property');
                $valid = FALSE;
            }
        }
        return $valid;
    }

    /**
     * Validates h5p data against a set of allowed values(options)
     *
     * @param array $selected
     *  The option(s) that has been specified
     * @param array $allowed
     *  The allowed options
     * @param string $library_name
     *  Name of the library we are validating (used in error messages)
     * @return boolean
     *  TRUE if the specified data is valid, FALSE otherwise
     */
    private function isValidH5pDataOptions($selected, $allowed, $library_name) {
        $valid = TRUE;
        foreach ($selected as $value) {
            if (!in_array($value, $allowed)) {
                $this->h5pF->setErrorMessage($this->h5pF->t('Illegal option %option in %library', array('%option' => $value, '%library' => $library_name)), 'illegal-option-in-library');
                $valid = FALSE;
            }
        }
        return $valid;
    }

    /**
     * Fetch json data from file
     *
     * @param string $filePath
     *  Path to the file holding the json string
     * @param boolean $return_as_string
     *  If true the json data will be decoded in order to validate it, but will be
     *  returned as string
     * @return mixed
     *  FALSE if the file can't be read or the contents can't be decoded
     *  string if the $return as string parameter is set
     *  array otherwise
     */
    private function getJsonData($filePath, $return_as_string = FALSE) {
        $json = file_get_contents($filePath);
        if ($json === FALSE) {
            return FALSE; // Cannot read from file.
        }
        $jsonData = json_decode($json, TRUE);
        if ($jsonData === NULL) {
            return FALSE; // JSON cannot be decoded or the recursion limit has been reached.
        }
        return $return_as_string ? $json : $jsonData;
    }

    /**
     * Helper function that copies an array
     *
     * @param array $array
     *  The array to be copied
     * @return array
     *  Copy of $array. All objects are cloned
     */
    private function arrayCopy(array $array) {
        $result = array();
        foreach ($array as $key => $val) {
            if (is_array($val)) {
                $result[$key] = self::arrayCopy($val);
            }
            elseif (is_object($val)) {
                $result[$key] = clone $val;
            }
            else {
                $result[$key] = $val;
            }
        }
        return $result;
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        // TODO: Implement render() method.
    }
}
