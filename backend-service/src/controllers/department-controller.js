import { Department } from '../models/DepartmentModel/DepartmentModel.js';
import { department_validation } from '../validations/crud-validations.js'

export const departmentResource = async (req, res) => {
  const body = req.body
  try {
    
  if (req.method == 'GET') {
    const department = await Department.find({})
    return res.status(200).json({
      status: 'success',
      data: department
    });
  }

  if (req.method == 'POST') {
    const { error } = department_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const department = new Department(body);
    await department.save();
    if (department) {
      return res.status(201).json({
        status: 'success',
        data: department
      });
    }
  }

  if (req.method == 'PATCH') {
    const { _id } = req.body
    delete req.body._id
    const department = await Department.find({_id})
    console.log('department ', req.body)
    if (department) {
      await Department.findByIdAndUpdate({_id}, req.body);
      return res.status(200).json({
        status: 'success',
        data: department
      });
    }
  }


  if (req.method == 'DELETE') {
    const { _id } = req.body
    const department = await Department.find({_id})
    if (department) {
      await Department.deleteOne({_id})
      res.status(200).json({
        status: 'success',
        message: 'Department Deleted'
      });
    } else {
      res.status(401).json({
        status: 'failed',
        message: 'Cannot Deleted Department '
      });
    }
    
  }

  } catch (e) {
    console.log("Error", e)
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}
