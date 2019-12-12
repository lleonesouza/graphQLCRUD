import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Resolvers
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { ProductResolver } from "./resolvers/ProductResolver";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );

  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, ProductResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4001;

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
