export default {
  async fetch(request, env) {
    const ERROR_RESPONSE = new Response("Something went wrong! 🥲");

    const url = new URL(request.url);

    if (!url.search) return ERROR_RESPONSE;
    const params = new URLSearchParams(url.search);

    if (!params.has('prompt')) return ERROR_RESPONSE;
    const input = params.get('prompt');
    
    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: input,
      },
    ];
    const response = await env.AI.run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", { messages });

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
