define([
    'metapolator/errors'
  , 'obtain/obtain'
  , 'ufojs/plistLib/main'
  , 'ufojs/plistLib/IntObject'
  , './ProjectMaster'
  , './parameters/registry'
  , './parameters/defaults'
], function(
    errors
  , obtain
  , plistLib
  , IntObject
  , ProjectMaster
  , parameterRegistry
  , defaultParameters
) {
    "use strict";

        // FIXME: ufoJS io must be able to do directory operations
    var fs = require.nodeRequire('fs')
        // FIXME: make this availabe for browsers, too
      , yaml = require.nodeRequire('js-yaml')
      , metainfo = {
            creator: 'org.ufojs.lib'
            // otherwise this ends as 'real' in the plist, I don't know
            // how strict robofab is on this, but unifiedfontobkect.org
            // says this is an int
          , formatVersion: new IntObject(3)
        }
      , ProjectError = errors.Project
      , KeyError = errors.Key
      ;
    
    function MetapolatorProject(io, dirName) {
        this._io = io;
        this._data = {
            masters: {}
        };
        this._masterCache = {}
        // here is a way to define a directory offset
        // this is used with _p.init after the dir was created for example
        this.dirName = dirName || '.';
    }
    
    MetapolatorProject.init = function(io, name) {
        var project = new MetapolatorProject(io)
          , dirName = name+'.ufo'
          ;
        // create dirName
        if(io.pathExists(false, dirName))
            throw new ProjectError('Dir exists already: '+ dirName);
        project.init(dirName);
    }
    
    var _p = MetapolatorProject.prototype;
    _p.constructor = MetapolatorProject;
    Object.defineProperty(_p, 'dataDir', {
        get: function(){ return this.dirName + '/data/com.metapolator'}
    });
    
    Object.defineProperty(_p, 'projectFile', {
        get: function(){ return this.dataDir + '/project.yaml' }
    });
    
    Object.defineProperty(_p, 'cpsDir', {
        get: function(){ return this.dataDir + '/cps' }
    });
    
    Object.defineProperty(_p, 'cpsDefaultFile', {
        get: function(){ return 'default.cps'; }
    });
    
    Object.defineProperty(_p, 'cpsGlobalFile', {
        get: function(){ return 'global.cps'; }
    });
    
    Object.defineProperty(_p, 'layerContentsFile', {
        get: function(){ return this.dirName+'/layercontents.plist'; }
    });
    
    
    
    _p.init = function(dirName) {
        // everything synchronously right now
        this.dirName = dirName;
        
        this._mkdir(false, this.dirName);
        
        // create dirName/metainfo.plist
        this._io.writeFile(false, this.dirName+'/metainfo.plist'
                                , plistLib.createPlistString(metainfo));
        
        // create dir dirName/data
        this._mkdir(false, this.dirName+'/data');
        // create dir dirName/data/com.metaploator
        this._mkdir(false, this.dataDir);
        
        // project file:
        // create     this.dataDir/project.yaml => yaml({})
        this._io.writeFile(false, this.projectFile, yaml.safeDump(this._data))
        
        // create dir this.dataDir/cps
        this._mkdir(false, this.cpsDir);
        this._io.writeFile(false, this.projectFile, yaml.safeDump(this._data))
        
        // create layercontents.plist
        this._io.writeFile(false, this.layerContentsFile,
                                        plistLib.createPlistString([]));
        
        // the glyphs dir must be there, so the ufo is valid. but we don't
        // use it currently :-(
        // create dir dirName/glyphs
        this._createGlyphLayer('public.default', 'glyphs');
        
        // create a default.cps
        // this is the standard wiring of cps compounds etc.
        // we include it, so it can be studied and if needed changed 
        this._io.writeFile(false, [this.cpsDir, '/', this.cpsDefaultFile].join(''),
                                        this.getDefaultCPS().toString());
        
        // this can be empty, all masters will use this by default
        this._io.writeFile(false, [this.cpsDir, '/', this.cpsGlobalFile].join(''),
                            '/* all masters use this CPS file by default*/');
    }
    
    _p._mkdir = obtain.factory(
        { mkdir: ['dirname', fs.mkdirSync.bind(fs)]}
      , { mkdir: ['dirname', '_callback', fs.mkdir.bind(fs)]}
      , ['dirname']
      , function(obtain){ return obtain('mkdir'); }
    )
    
    _p.load = function() {
        // the files created in _p.init need to exist
        // however, we try to load only
        // this.dirName+'/data/com.metapolator/project.yaml' as an indicator
        console.log('loading', this.projectFile);
        var dataString = this._io.readFile(false, this.projectFile);
        console.log('loaded', dataString);
        this._data = yaml.safeLoad(dataString);
        
        
    }
    
    /**
     * return a ParameterCollection with the default CPS wireing, as the
     * importer expects it.
     */
    _p.getDefaultCPS = function() {
        return defaultParameters;
    }
    
    _p.hasMaster = function(masterName) {
        return masterName in this._data.masters;
    }
    
    _p._createGlyphLayer = function(name, layerDirName) {
        if(layerDirName === undefined)
            layerDirName = 'glyphs.' + name;
        
        var layerDir = [this.dirName,'/',layerDirName].join('');
        
        // read layercontents.plist
        var layercontents = plistLib.readPlistFromString(
                this._io.readFile(false, this.layerContentsFile));
        
        // see if there is a layer with this name
        for(var i=0;i<layercontents.length;i++)
            if(layercontents[i][0] === name)
                throw new ProjectError('A glyph layer with name "'+name
                                                +'" altready exists.')
        
        // see if there is a directory with the name layerDir already
        if(this._io.pathExists(false, layerDir))
            throw new ProjectError('Can\'t create glyph layer. A directory '
                                    +'with name "' + layerDir
                                    +'" altready exists.');
        // create new layer dir
        this._mkdir(false, layerDir);
        
        // store layer in layercontents
        layercontents.push([name, layerDirName]);
        this._io.writeFile(false, this.layerContentsFile,
                                    plistLib.createPlistString(layercontents));
        
        // create empty layerDir/contents.plist
        this._io.writeFile(false, layerDir + '/contents.plist',
                                        plistLib.createPlistString({}));
        
        
        
    }
    
    /**
     * Returns the path needed to instanciate a GlyphSet
     */
    _p._getLayerDir = function(name) {
        // read layercontents.plist
        var layercontents = plistLib.readPlistFromString(
                this._io.readFile(false, this.layerContentsFile))
          , layerDir
          ;
        
        for(var i=0;i<layercontents.length;i++)
            if(layercontents[i][0] === name) {
                layerDir = [this.dirName,'/',layercontents[i][1]].join('');
                break;
            }
        if(!layerDir)
            throw new KeyError('Layer named "' + name + '" not found.')
        if(!this._io.pathExists(false, layerDir))
            throw new KeyError('Layer directory "' + layerDir
                                + '" does not exist, but is linked in '
                                +'layercontents.plist.')
        return layerDir;
    }
    
    /**
     * create a master entry for this masterName
     * {
     *      cpsLocalFile: masterName.cps
     *    , cpsChain: [global.cps, masterName.cps]
     * }
     * 
     * and an entry in layercontents.plist:
     * skeleton.masterName, glyphs.skeleton.masterName
     * 
     */
    _p.createMaster = function(masterName) {
        // get the name for this master from the cli
        if(this.hasMaster(masterName))
            throw new ProjectError('Master "'+masterName+'" alredy exists.');
        var master = {};
        this._data.masters[masterName] = master;
        master.cpsLocalFile = masterName + '.cps';
        master.cpsChain = [this.cpsDefaultFile, this.cpsGlobalFile, master.cpsLocalFile];
        
        // create a skeleton layer for this master
        master.skeleton = 'skeleton.' + masterName;
        this._createGlyphLayer(master.skeleton);
        
        
        this._io.writeFile(false, this.projectFile, yaml.safeDump(this._data))
        
        return this.getMaster(masterName);
    }
    _p._getMaster = function(masterName) {
        var master =  this._data.masters[masterName]
          , glyphSetDir = this._getLayerDir(master.skeleton)
          ;
        return new ProjectMaster(this._io, this, glyphSetDir
                                , master.cpsLocalFile, master.cpsChain);
    }
    
    _p.getMaster = function(masterName) {
        if(!this.hasMaster(masterName))
            throw new KeyError('Master "'+masterName+'" not in Projekt');
        if(!this._masterCache[masterName]) {
            this._masterCache[masterName] = this._getMaster(masterName);
        }
        return this._masterCache[masterName];
    }
    
    _p.open = function(masterName) {
        var master = this.getMaster(masterName)
          , collections = master.loadAllCPS();
        console.log('master', master);
        
        
    }
    
    return MetapolatorProject;
});
