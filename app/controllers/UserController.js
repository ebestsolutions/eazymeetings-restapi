import { Validator } from 'node-input-validator'
import { exec } from 'child_process'

const signup = async (req, res) => {
    const data = req.body

    const v = new Validator(req.body, {
        name: 'required',
        email: 'required|email',
        password: 'required',
        role: 'required',
    })

    try {
        const matched = await v.check()

        if (!matched) {
            return res.status(422).json({ errors: v.errors })
        }

        const shellCommand = `docker exec greenlight-v2 bundle exec rake user:create["${data.name}","${data.email}","${data.password}","${data.role}"]`;

        exec(shellCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error in executing command: ${err}`)

                return res.status(500).json({ error: err })
            }

            if (stderr) {
                console.error(`Command executaion failed: ${stderr}`)

                return res.status(500).json({ error: stderr })
            }

            return res.status(200).json({
                name: data.name,
                email: data.email,
                role: data.role,
            })
        })
    } catch (error) {
        return res.status(500).json({
            [error.path]: error.message
        })
    }
}

export default { signup }
