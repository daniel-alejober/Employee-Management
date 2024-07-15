import Attendance from "../models/attendance.js";
import moment from "moment";

const registerAttendance = async (req, res) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;
    const existingAttendance = await Attendance.findOne({ employeeId, date });
    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = await Attendance.create({
        employeeId,
        employeeName,
        date,
        status,
      });
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed submitting attendance" });
  }
};

const getAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    const attendanceData = await Attendance.find({ date });
    res.status(200).json(attendanceData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed fetching attendance" });
  }
};

const attendanceReportAll = async (req, res) => {
  try {
    const { month, year } = req.query;

    //*$expr compara todos los documentos y trae los que cumplan la condicion
    //* $month es una palabra reservada de mongodb que nos trae el mes de un campo fecha al igual que $year
    //? {
    //?  "_id" : 1,
    //?  "item" : "abc",
    //?  "price" : 10,
    //?  "quantity" : 2,
    //?  "date" : ISODate("2014-01-01T08:15:39.736Z")
    // ?}

    //*Ejemplo
    // db.tabla.aggregate([
    //   {
    //     $project: {
    //       year: { $year: "$date" },
    //       month: { $month: "$date" },
    //       day: { $dayOfMonth: "$date" },
    //       hour: { $hour: "$date" },
    //       minutes: { $minute: "$date" },
    //       seconds: { $second: "$date" },
    //       milliseconds: { $millisecond: "$date" },
    //       dayOfYear: { $dayOfYear: "$date" },
    //       dayOfWeek: { $dayOfWeek: "$date" },
    //       week: { $week: "$date" },
    //     },
    //   },
    // ]);

    //{
    //   "_id" : 1,
    //   "year" : 2014,
    //   "month" : 1,
    //   "day" : 1,
    //   "hour" : 8,
    //   "minutes" : 15,
    //   "seconds" : 39,
    //   "milliseconds" : 736,
    //   "dayOfYear" : 1,
    //   "dayOfWeek" : 4,
    //   "week" : 0
    // }
    //*{ $dateFromString: { dateString: <cadena>, format: <formato> } } tranforma un string en un objeto de tipo fecha para que asi pueda hacer match con $month
    //*{ $dateFromString: { dateString: "2024-03-24" } }
    //!$date es una variable que tenemos guardada en el schmema de mongo y para acceder a ella dinamicamente ponemos $date

    //*Explicacion eq-- aqui esta comparando nos va a regresar todos los datos que sean igual
    //* $eq: [
    //*        { $month: { $dateFromString: { dateString: "$date" } } }, este es el valor de la base de datos pueden ser n --- 1,2,3,4,5,6,7,8......
    //*        parseInt(req.query.month), este es valor que manda ejemplo 3, me debe de traer todos los que sean iguales a 3
    //*       ],

    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $month: {
                      $dateFromString: {
                        dateString: "$date",
                      },
                    },
                  },
                  parseInt(month),
                ],
              },
              {
                $eq: [
                  {
                    $year: {
                      $dateFromString: {
                        dateString: "$date",
                      },
                    },
                  },
                  parseInt(year),
                ],
              },
            ],
          },
        },
      },
      //*Vamos a agrupar los valores $group por medio del $employeeId que es un valor de nuestro schema
      //*creamos un nuevo campo llamado present(puede tener cualquier nombre)
      //*vamos a hacer una suma de la condicion que cumpla
      //*la condicion va asi { $cond: { if: <boolean-expression>, then: <true-case>, else: <false-case> } }
      //*Entonces si el valor de nuestro schema llamado $status es igual al valor que le pasamos sumara 1, recuerda que el primer valor de
      //*{ $eq: ["$status", "absent"] } puede ser n $status = present $status=absent ..... pero el segundo es el que manda
      //! regresara un array de objetos solo con las especificaciones,
      //! [{_id: '65c185436ea2956f55fb9be8',present: 1,absent: 0,halfday: 0,holiday: 0}]
      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      //*Se agrego este campo esta instruccion ya que _id estaba guardado como un string y para hacer el lookuo necesita ser un ObjectId
      {
        $addFields: {
          employeeIdObj: { $toObjectId: "$_id" },
        },
      },
      //*$lookup son los innerjoin de mongo van y buscan valores en otras tablas pero deben de tener alguna referencia, regresa un array de objetos de todos los elementos que hagan match
      {
        $lookup: {
          from: "employees", //*nombre de la tabla de la base desde donde va a buscar NOTA:Deber de llevar el nombre que aparece en mongodb, no en el schema
          localField: "employeeIdObj", //*es el valor por el cual buscara, tenemos que pasarle un valor que sea igual a su _id
          foreignField: "_id", //*y nuestro match se encuentra en la tabla attendances que el campo se llama employeeId que es igual al _id de algun documento
          as: "employeeDetails", //*le damos un nuevo nombre a este nuevo campo puede ser cualquiera
        },
      },
      //* $unwind regresara un objeto por cada elemento que encuentre en el campo seleccionado
      //*en la db hay estos documentos(objetos) solo el _id 1 y 3 tienen sizes

      // { "_id" : 1, "item" : "Shirt", "sizes": [ "S", "M", "L"] },
      // { "_id" : 2, "item" : "Shorts", "sizes" : [ ] },
      // { "_id" : 3, "item" : "Hat", "sizes": "M" },
      // { "_id" : 4, "item" : "Gloves" },
      // { "_id" : 5, "item" : "Scarf", "sizes" : null }

      //*db.unaTablaX.aggregate( [ { $unwind: { path: "$sizes" } } ] )

      //? { _id: 1, item: 'Shirt', sizes: 'S' },
      //? { _id: 1, item: 'Shirt', sizes: 'M' },
      //? { _id: 1, item: 'Shirt', sizes: 'L' },
      //? { _id: 3, item: 'Hat', sizes: 'M' }

      //*crea un objeto nuevo por cada elemento que se encuentre en el elemento seleccionado no importa si solo tiene 1 o es un array de n valores
      {
        $unwind: "$employeeDetails",
      },
      {
        $project: {
          _id: 1, //*con uno agrega los valores con 0 los quita
          present: 1,
          absent: 1,
          halfday: 1,
          holiday: 1,
          name: "$employeeDetails.employeeName", //* Si queremos agregar nuevo valores se los tenemos que especificar, si solo dejamos $employeeDetails agrega todo el objeto
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);
    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed fetching attendance" });
  }
};

export { registerAttendance, getAttendance, attendanceReportAll };
