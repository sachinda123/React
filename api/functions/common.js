const { RBAC } = require("rbac");
module.exports = {
  //All users can query medication records and customer records --->> done
  // ❖ Only the Owner can insert, update, soft delete and (permanently) delete medication
  // records and customer records. Managers and Cashiers should not be able to insert or
  // (permanently) delete any data.
  // ❖ Managers can update and soft delete medication records and customer records, but they
  // cannot insert or (permanently) delete data.

  validateRequest: (permission, controller) => {
    var middleware = async (req, res, next) => {
      try {
        let user_role = req.user.Role.role;
        const rbac = new RBAC({
          roles: ["owner", "managers", "cashiers"],
          permissions: {
            customer: ["get-all", "post-create", "put-innactive-id", "delete-delete-id", "put-update-id"],
            medication: ["get-all", "post-create", "put-innactive-id", "delete-delete-id", "put-update-id"],
            user: ["get-all"],
          },
          grants: {
            owner: [
              "get-all_customer",
              "post-create_customer",
              "put-innactive-id_customer",
              "delete-delete-id_customer",
              "put-update-id_customer",
              // all customer functions
              "get-all_medication",
              "post-create_medication",
              "put-innactive-id_medication",
              "delete-delete-id_medication",
              "put-update-id_medication",
              // all medication functions
              "get-all_user",
              // all user funtion
            ],

            managers: ["get-all_customer", "get-all_medication", "put-innactive-id_customer", "put-update-id_customer", "put-innactive-id_medication", "put-update-id_medication"],
            cashiers: ["get-all_customer", "get-all_medication", "put-update-id_customer", "put-update-id_medication"],
          },
        });
        await rbac.init();
        var can = await rbac.can(user_role, permission, controller);
        if (!can) {
          module.exports.sendResponse(res, 401, "Access Denied");
          return;
        }
      } catch (e) {
        console.log("e", e);
        module.exports.sendResponse(res, 500, "Internal server error");
        return;
      }
      next();
    };
    return middleware;
  },
  sendResponse: (res, status, message, data = false) => {
    let senddata;
    if (data == true) {
      senddata = message;
    } else {
      senddata = {
        message: message,
      };
    }
    res.status(status).json(senddata);
    res.end();
  },
};
