const Customer = require('../models/customerModel')

const CustomerCtrl = {
    getCustomersForUser: async (req, res) => {
        try {
            const Customers = await Customer.find({ userid: req.body.userid })
            res.json(Customers)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getCustomerById: async (req, res) => {
        try {
            const CustomerId = req.params.id; // URL'den kartın MongoDB ID'sini alın

            const Customer = await Customer.findById(CustomerId); // MongoDB'den kart verilerini alın

            if (!Customer) {
                // Eğer kart yoksa hata döndürün
                return res.status(404).json({ msg: "Servis bulunamadı" });
            }

            res.json(Customer); // Kart verilerini JSON formatında sunun
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCustomer: async (req, res) => {
        try {
            const { userid, customername, customersurname, companyname, tcorvkn, address, gsmno } = req.body;

            const newCustomer = new Customer({
                userid, customername, customersurname, companyname, tcorvkn, address, gsmno
            })

            await newCustomer.save()
            res.json({ msg: "Yeni Servis Eklendi." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCustomer: async (req, res) => {
        try {
          const { isArchived } = req.body;
          const Customer = await Customer.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
          if (!Customer) return res.status(404).json({ msg: 'Servis bulunamadı' });
          res.json(Customer);
        } catch (err) {
          return res.status(500).json({ msg: err.message })
        }
    },
    
    updateCustomerData: async (req, res) => {
        try {
          const { CustomerName, CustomerGsmno, CustomerAddress, CustomerDesc, CustomerBrand, CustomerModel, CustomerType, CustomerPrice } = req.body;
      
          const Customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { CustomerName, CustomerGsmno, CustomerAddress, CustomerDesc, CustomerBrand, CustomerModel, CustomerType, CustomerPrice},
            { new: true }
          );
      
          if (!Customer) {
            return res.status(404).json({ msg: 'Servis bulunamadı' });
          }
      
          res.json(Customer);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            await Customer.findByIdAndDelete(req.params.id)
            res.json({ msg: "Servis Silindi." })
        } catch (err) {
            return res.status(500).json({ msg: 'Error Message' })
        }
    },
    // updateTask: async (req, res) => {
    //     try {
    //         const { name, useremail, title, address, price, description, type, images, roomnumber, saletype, features, squaremeters } = req.body;

    //         await Task.findOneAndUpdate({ _id: req.params.id }, {
    //             name, useremail, title, address, price, description, type, images, roomnumber, saletype, features, squaremeters
    //         })

    //         res.json({ msg: "Task Güncellendi." })
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // }
}

module.exports = CustomerCtrl