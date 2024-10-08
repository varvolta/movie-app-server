const { put } = require('@vercel/blob')
const { NextResponse } = require('next/server')

async function POST(request) {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('poster')

    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, request.body, {
        access: 'public',
    })

    // Here's the code for Pages API Routes:
    // const blob = await put(filename, request, {
    //   access: 'public',
    // });

    return NextResponse.json(blob)
}

module.exports.POST = POST