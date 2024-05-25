const EncryptPassword = (password) => {
    console.log(password)
    let encrypted = '';
    const arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','ö','ä'];
    
    if (!/^[a-zA-Z]+$/.test(password)) {
        throw new Error('Password must contain only letters');
    }

    for(let i = 0; i < password.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(password[i] == arr[j] || password[i] == arr[j].toLocaleUpperCase()){
                if(password[i] == arr[j]){
                    if(password[i] != 'ä'){
                        encrypted += arr[j+1] 
                    }
                    else{
                        encrypted += 'a'
                    }
                }
                else if(password[i] == arr[j].toLocaleUpperCase()){
                    if(password[i] != 'Ä'){
                        encrypted += arr[j+1].toLocaleUpperCase()
                    }
                    else{
                        encrypted += 'A'
                    }
                }
            }
        }
    }
    console.log(encrypted)
    return encrypted;
};

const Decrypt = (password) => {
    console.log(password)
    let decrypted = '';
    const arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','ö','ä'];
    for(let i = 0; i < password.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(password[i] == arr[j] || password[i] == arr[j].toLocaleUpperCase()){
                if(password[i] == arr[j]){
                    if(password[i] != 'a'){
                        decrypted += arr[j-1] 
                    }
                    else{
                        decrypted += 'ä'
                    }
                }
                else if(password[i] == arr[j].toLocaleUpperCase()){
                    if(password[i] != 'A'){
                        decrypted += arr[j-1].toLocaleUpperCase()
                    }
                    else{
                        decrypted += 'Ä'
                    }
                }
            }
        }
    }
    console.log(decrypted)
    return decrypted

};


export { EncryptPassword, Decrypt };