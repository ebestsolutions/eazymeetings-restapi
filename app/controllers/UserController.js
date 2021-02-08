const { Validator } = require('node-input-validator')
const { exec } = require('child_process')
const config = require('../config/index.js')

const create = async (req, res) => {
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

        exec(shellCommand, { cwd: '/root/greenlight' }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error in executing command: ${err}`)

                return res.status(500).json({ error: err })
            }

            if (stderr) {
                console.error(`Command executaion failed: ${stderr}`)

                return res.status(500).json({ error: stderr })
            }

            console.log(`Success: ${stdout}`)

            return res.status(200).json({
                message: stdout,
                data: {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                },
            })
        })
    } catch (error) {
        return res.status(500).json({
            [error.path]: error.message
        })
    }
}

const list = async (req, res) => {
    const data = req.params

    const v = new Validator(req.params, {
        limit: 'integer',
        offset: 'integer',
        ordering: 'string',
    })

    try {
        const matched = await v.check()

        if (!matched) {
            return res.status(422).json({ errors: v.errors })
        }

        let sql = 'SELECT id, room_id, username, uid, name FROM users';

        if (data.ordering) {
            sql += ` ORDER BY ${data.ordering} `;
        }

        if (data.offset && data.limit) {
            sql += ` offset ${data.offset} limit ${data.limit} `;
        } else if (data.limit) {
            sql += ' limit ${data.limit} ';
        }

        sql += ';';

        const shellCommand = `docker exec greenlight-v2 psql "${config.dbURL}" -c "${sql}"`;

        exec(shellCommand, { cwd: '/root/greenlight' }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error in executing command: ${err}`)

                return res.status(500).json({ error: err })
            }

            if (stderr) {
                console.error(`Command executaion failed: ${stderr}`)

                return res.status(500).json({ error: stderr })
            }

            console.log(`Success: ${stdout}`)

            return res.status(200).json({ message: stdout })
        })
    } catch (error) {
        return res.status(500).json({
            [error.path]: error.message
        })
    }
}

const get = async (req, res) => {
    const data = req.params

    const v = new Validator(req.params, { uid: 'required|string' })

    try {
        const matched = await v.check()

        if (!matched) {
            return res.status(422).json({ errors: v.errors })
        }

        let sql = `SELECT id, room_id, username, uid, name FROM users WHERE uid = ${data.uid};`;

        const shellCommand = `docker exec greenlight-v2 psql "${config.dbURL}" -c "${sql}"`;

        exec(shellCommand, { cwd: '/root/greenlight' }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error in executing command: ${err}`)

                return res.status(500).json({ error: err })
            }

            if (stderr) {
                console.error(`Command executaion failed: ${stderr}`)

                return res.status(500).json({ error: stderr })
            }

            console.log(`Success: ${stdout}`)

            return res.status(200).json({ message: stdout })
        })
    } catch (error) {
        return res.status(500).json({
            [error.path]: error.message
        })
    }
}

module.exports = {
    create,
    get,
    list,
}
