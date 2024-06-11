import bcrypt from 'bcryptjs'

//Hash Password
export const hasher = (word: string) : string => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(word, salt); 
}

//Compare Hash
export const matcher = (word1: string, word2: string) : boolean => {
    return bcrypt.compareSync(word1, word2);
}
 