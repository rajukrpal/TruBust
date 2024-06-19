


  import { data } from "autoprefixer";
import axios from "axios";


// ____________________________________________________________
//   let authToken = localStorage.getItem('authToken')  || '';
//   console.log("tockannn",authToken)
//   export  const getAuthToken = () => authToken;
// ___________________________________________________________

let authToken = localStorage.getItem('authToken') || '';

export const getAuthToken = () => {
  authToken = localStorage.getItem('authToken') || '';
  return authToken;
};


  export const removeAuthTokenFromLocalStorage = () => {
    authToken = '';
    localStorage.removeItem('authToken');
  };
  
  export const saveToken =(token)=>{
    localStorage.setItem('authToken', token);

}

// login Api post
export default async function fetchLogin(email, password) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}admin/login`,{ 
             email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const data = response.data;

        saveToken(data.token)
        return data;
        

    } catch (error) {
        
        console.log(error);
    }
}

// Analytics Api get
export const AnalyticsFeatchData = async () => {
try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}dashboard/Counter`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
           
        }
    })
    return response;
    
} catch (error) {
    console.log(error)
}
}

// Analytics page table Api get
export const topCompaniesTable = async () =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}company/GetCompanyRequest`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        return response ;
    } catch (error) {
        console.log(error)
    }
}

// compony page table get
export const getCopmonypageTable = async () =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}company/GetCompany`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

//  compony page add coumpany post
export const companyPageTable = async (formData) =>{

    try {
        const token = getAuthToken();
       
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}company/AddOrUpdate`,
            JSON.stringify(formData),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        );
        console.log("response",response);

        return response;       

    } catch (error) {
        console.log(error);
    }
}

// add coumpany  delete post 
export const deleteDataFunction = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}company/Delete`, {
            "companyID": id
        }, 
          {  headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }}
        );
        if (response.status === 200) {
            console.log("Data deleted successfully!");
        } else {
            console.error("The company i d field is required.");
        }
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

// singleCompany get
export const singleCompany = async(companyID) =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}company/SingleCompany?comapnyID=${companyID}`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// company with user get
export const companyWithUser = async(companyID) =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}company/CompanyUserList?comapnyID=${companyID}`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// get replay get
export const GetRequestApi = async() =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}externalrequest/GetAllRequest`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// approve And Decline post
export const approveAndDecline = async (rowId,status) =>{

    try {
        const token = getAuthToken();
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}externalrequest/ApproveORDecline`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        );
        return response;       

    } catch (error) {
        console.log(error);
    }
}

// UserApi  get
export const GetUserApi = async() =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}user/GetUser`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// user Add form post
export const usersAddForm = async (formData) =>{

    try {
        const token = getAuthToken();
       
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}user/AddOrUpdate`,
            JSON.stringify(formData),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        );

        return response;       

    } catch (error) {
        console.log(error);
    }
}

// add users delete post
export const deleteUserFunction = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}user/Delete`, {
            "userID": id
        }, 
          {  headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }}
        );
        if (response.status === 200) {
            console.log("Data deleted successfully!");
        } else {
            console.error("The company i d field is required.");
        }
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

// GenerateOtp post
export const GenerateOtpApi = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}user/GenerateOtp`, {
            "userID": id
        }, 
          {  headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }}
        );
        
        if (response.status === 200) {
            console.log("Varification code send successfully!");

        } else {
            console.error("userId  field is required.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

 // GetSupportTicketApi post
export const GetSupportTicketApi = async () =>{

    try {
        const token = getAuthToken();
       
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}supportTicket/GetsupportTicket`,
            JSON.stringify(),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        );

        return response;       

    } catch (error) {
        console.log(error);
    }
}

// GetSupportTicketReplayApi get
export const GetSupportTicketReplayApi = async(receiverID) =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}supportTicket/GetReplay?userID=${receiverID}`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// PostSupportTicatChat post  
export const PostSupportTicatChat = async (chatData) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}supportTicket/admin/send`, 
            // "userID": id
            JSON.stringify(chatData),
        
          {  headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }}
        );
        
        if (response.status === 200) {
            console.log("Varification code send successfully!");

        } else {
            console.error("userId  field is required.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
 
// GetExternalApi get
export const GetExternalApi = async() =>{
    try {
        const token = getAuthToken();
        const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}externalrequest/GetAllRequest`,{

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return response ;
    } catch (error) {
        console.log(error);
    }
}

// GetExternalReplayApi chat get
export const GetExternalReplayApi = async(companyID,requestID,userID) =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}admin/externalrequest/GetReplay?userID=${userID}&companyID=${companyID}&requestID=${requestID}`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }

// PostExternalChatReplayApi chat replay post  
    export const PostExternalChatReplayApi = async (chatData) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}request/ExternalRequest`, 
                // "userID": id
                JSON.stringify(chatData),
            
              {  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }}
            );
            
            if (response.status === 200) {
                console.log("chat send successfully!");
    
            } else {
                console.error("userId  field is required.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


// GetInternalRequest table get 
    export const GetInternalRequest = async() =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}internalrequest/GetInternalRequest`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }


    export const GetGroupChatList = async() =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}groupchat/GroupChatList`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }
   

// GetGroupChat get
    export const GetGroupChat = async(companyID) =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}groupchat/getGroupChat?companyID=${companyID}`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }

// sendGroupChat post
    export const sendGroupChat = async (chatData) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(`${import.meta.env.VITE_APPWRITE_URL}groupchat/admin/send`, 
                // "userID": id
                JSON.stringify(chatData),
            
              {  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }}
            );
            
            if (response.status === 200) {
                console.log("Varification code send successfully!");
    
            } else {
                console.error("userId  field is required.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

// getSystemLog get
    export const getSystemLog = async() =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}logs/SystemLog`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }

    // getSystemErrorLog get
    export const getSystemErrorLog = async() =>{
        try {
            const token = getAuthToken();
            const response = await axios.get(`${import.meta.env.VITE_APPWRITE_URL}logs/ErrorLog`,{
    
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            return response ;
        } catch (error) {
            console.log(error);
        }
    }



