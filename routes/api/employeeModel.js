var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');
  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(
      (err, docs) => {
        if(err){
          handler(err,null);
        }else{
          handler(null,docs);
        }
      }
    )
    //return handler(new Error("No Implementado"), null);
  };

  lib.getEmployeesById = (id, handler) => {
    empColl.findOne({"_id":new ObjectID(id)},(err,doc)=>{
      sent ={"email":doc.email,"phone":doc.phone,"name":doc.name,"age":doc.age};
      if(err){
        handler(err,null);
      }else{
        handler(null,sent);
      }
    })
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
   // return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    var queryObject = {"company":company};
    console.log(company);
    empColl.find(queryObject).toArray((err,doc)=>{

      


      if(err){
        handler(err,null);
      }else{
        sent1 = []
        doc.forEach((v) =>{
        sent ={"email":v.email,"company":v.company,"name":v.name};
        sent1.push(sent);
        })
        handler(null,sent1);
      }
    })
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {

    empColl.find({"age":{$gt:parseInt(ageLowLimit),$lt:parseInt(ageHighLimit)}}).toArray((err,doc) => {
      if(err){
        handler(err,null);
      }else{
        sent1 = []
        doc.forEach((v) =>{
        sent ={"email":v.email,"name":v.name,"age":v.age};
        sent1.push(sent);
        })
        handler(null,sent1);
      }
    });
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    //return handler(new Error("No Implementado"+ageLowLimit+ageHighLimit), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var queryObject = {"tags": {"$in":Array.isArray(tag)? tag:[tag]}};
    empColl.find(queryObject).toArray((err,doc) => {
      if(err){
        handler(err,null);
      }else{
        sent1 = []
        doc.forEach((v) =>{
        sent ={"email":v.email,"name":v.name,"tags":v.tags};
        sent1.push(sent);
        })
        handler(null,sent1);
      }
    });//toArray
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
   // return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tags, id, handler) => {
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = {"$set":{"tags":curatedTags}};
    empColl.updateOne({"_id":ObjectID(id)}, updateObject, (err, rsult) => {
      if(err){
        handler(err,null);
      }else{
        handler(null, rsult.result);
      }
    } );//updateOne
  }

    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    //return handler(new Error("No Implementado"), null);
  

  lib.removeEmployee = (Id, handler) => {
    empColl.deleteOne({"_id":ObjectID(Id)}, (err, rslt)=>{
      if(err){
        console.log(err);
        handler(er,null);
      }else {
        handler(null, rslt.result);
      }
    });//deleteOne


    //Implementar
    //Se requiere eliminar un documento de la colección
    //return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
