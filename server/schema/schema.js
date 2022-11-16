const Prospect = require("../models/Prospect");
const Account = require("../models/Account");
const Interaction = require("../models/Interaction");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// Prospect Type
const ProspectType = new GraphQLObjectType({
  name: "Prospect",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: GraphQLString },
    dmLevel: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    account: {
      type: AccountType,
      resolve(parent, args) {
        return Account.findById(parent.accountId);
      },
    },
  }),
});

// Account Type
const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    size: { type: GraphQLString },
    industry: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

// Interaction Type
const InteractionType = new GraphQLObjectType({
  name: "Interaction",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    notes: { type: GraphQLString },
    type: { type: GraphQLString },
    outcome: { type: GraphQLString },
    prospect: {
      type: ProspectType,
      resolve(parent, args) {
        return Prospect.findById(parent.prospectId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    prospects: {
      type: new GraphQLList(ProspectType),
      resolve(parent, args) {
        return Prospect.find();
      },
    },
    prospect: {
      type: ProspectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Prospect.findById(args.id);
      },
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parent, args) {
        return Account.find();
      },
    },
    account: {
      type: AccountType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Account.findById(args.id);
      },
    },
    interactions: {
      type: new GraphQLList(InteractionType),
      resolve(parent, args) {
        return Interaction.find();
      },
    },
    interaction: {
      type: InteractionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Interaction.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add an account
    addAccount: {
      type: AccountType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        size: { type: GraphQLNonNull(GraphQLString) },
        industry: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const account = new Account({
          name: args.name,
          size: args.size,
          industry: args.industry,
          description: args.description,
          notes: args.notes,
        });

        return account.save();
      },
    },
    // Delete an account
    deleteAccount: {
      type: AccountType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Prospect.find({ accountId: args.id }).then((prospects) => {
          prospects.forEach((prospect) => {
            prospect.remove();
          });
        });

        return Account.findByIdAndRemove(args.id);
      },
    },
    // Update an account
    updateAccount: {
      type: AccountType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        size: { type: GraphQLString },
        industry: { type: GraphQLString },
        description: { type: GraphQLString },
        notes: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Account.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              size: args.size,
              industry: args.industry,
              description: args.description,
              notes: args.notes,
            },
          },
          { new: true }
        );
      },
    },
    // Add a prospect
    addProspect: {
      type: ProspectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        position: { type: GraphQLNonNull(GraphQLString) },
        dmLevel: {
          type: new GraphQLEnumType({
            name: "DMLevel",
            values: {
              dm: { value: "Decision Maker" },
              influencer: { value: "Influencer" },
              gk: { value: "Gatekeeper"},
            },
          }),
          defaultValue: "Decision Maker",
        },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        accountId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const prospect = new Prospect({
          name: args.name,
          position: args.position,
          dmLevel: args.dmLevel,
          email: args.email,
          phone: args.phone,
          accountId: args.accountId,
        });

        return prospect.save();
      },
    },
    // Delete a prospect
    deleteProspect: {
      type: ProspectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Prospect.findByIdAndRemove(args.id);
      },
    },
    // Update a prospect
    updateProspect: {
      type: ProspectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        dmLevel: { 
          type: new GraphQLEnumType({
            name: "DMLevelUpdate",
            values: {
              dm: { value: "Decision Maker" },
              influencer: { value: "Influencer" },
              gk: { value: "Gatekeeper" },
            },
          }),
        },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        // accountId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Prospect.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              position: args.position,
              dmLevel: args.dmLevel,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      },
    },
    // Add an interaction
    addInteraction: {
      type: InteractionType,
      args: {
        date: { type: GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLNonNull(GraphQLString) },
        type: {
          type: new GraphQLEnumType({
            name: "Type",
            values: {
              call: { value: "Call" },
              email: { value: "Email" },
              inmail: { value: "InMail" },
            },
          }),
        },
        outcome: { type: GraphQLNonNull(GraphQLString) },
        prospectId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const interaction = new Interaction({
          date: args.date,
          notes: args.notes,
          type: args.type,
          outcome: args.outcome,
          prospectId: args.prospectId,
        });

        return interaction.save();
      },
    },
    // Delete an interaction
    deleteInteraction: {
      type: InteractionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Interaction.findByIdAndRemove(args.id);
      },
    },
    // Update an interaction
    updateInteraction: {
      type: InteractionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        date: { type: GraphQLString },
        notes: { type: GraphQLString },
        type: {
          type: new GraphQLEnumType({
            name: "TypeUpdate",
            values: {
              call: { value: "Call" },
              email: { value: "Email" },
              inmail: { value: "InMail" },
            },
          }),
        },
        outcome: { type: GraphQLString },
        prospectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Interaction.findByIdAndUpdate(
          args.id,
          {
            $set: {
              date: args.date,
              notes: args.notes,
              type: args.type,
              outcome: args.outcome,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
