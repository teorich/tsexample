import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import Realm from 'realm';
import getRealmSchemas from '../../RealmConfig';
import RegisterSession from '../models/RegisterSession.model';
import {useReduxSelector} from '../store/index';
import {realmApp} from '../../RealmConfig';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const RegisterSessionContext = React.createContext<any>(null);

// const appRealm = getRealm();

const RegisterSessionProvider = ({children}) => {
  const [registerSessions, setRegisterSessions] = useState<
    Realm.Results<RegisterSession> | []
  >([]);

  const [currentRegisterSession, setCurrentRegisterSession] = useState<
    Realm.Results<RegisterSession> | undefined | null
  >(null);

  const realmRef = useRef<Realm | null>(null);

  const subscriptionRef = useRef<Realm.Results<RegisterSession> | null>(null);

  const user = useReduxSelector(state => state.user.currentUser);
  const storeAgency = useReduxSelector(state => state.agency.currentAgency);

  const openRealm = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      // Open a local realm file with the schema(s) that are a part of this realm.
      // const config: Realm.Configuration = {
      //   schema: [Shop.schema],
      //   schemaVersion: 1,
      //   // Uncomment the line below to specify that this Realm should be deleted if a migration is needed.
      //   // (This option is not available on synced realms and is NOT suitable for production when set to true)
      //   deleteRealmIfMigrationNeeded: true, // default is false
      // };

      // Since this is a non-sync realm (there is no "sync" field defined in the "config" object),
      // the realm will be opened synchronously when calling "Realm.open"
      const OpenRealmBehaviorConfiguration: any = {
        type: 'openImmediately',
      };
      const config = {
        schema: [...getRealmSchemas], // add multiple schemas, comma seperated.
        schemaVersion: 1,
        sync: {
          user: realmApp.currentUser,
          partitionValue: realmApp.currentUser?.id,
          newRealmFileBehavior: OpenRealmBehaviorConfiguration,
          existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        },
      };
      const realm = await Realm.open(config);
      realmRef.current = realm;

      // When querying a realm to find objects (e.g. realm.objects('Tasks')) the result we get back
      // and the objects in it are "live" and will always reflect the latest state.
      const RegisterSessionResults: Realm.Results<RegisterSession> =
        realm.objects('RegisterSessions');
      if (RegisterSessionResults?.length) {
        setRegisterSessions(RegisterSessionResults);
      }

      // Live queries and objects emit notifications when something has changed that we can listen for.
      subscriptionRef.current = RegisterSessionResults;
      RegisterSessionResults.addListener((/*collection, changes*/) => {
        // If wanting to handle deletions, insertions, and modifications differently you can access them through
        // the two arguments. (Always handle them in the following order: deletions, insertions, modifications)
        // If using collection listener (1st arg is the collection):
        // e.g. changes.insertions.forEach((index) => console.log('Inserted item: ', collection[index]));
        // If using object listener (1st arg is the object):
        // e.g. changes.changedProperties.forEach((prop) => console.log(`${prop} changed to ${object[prop]}`));

        // By querying the objects again, we get a new reference to the Result and triggers
        // a rerender by React. Setting the tasks to either 'tasks' or 'collection' (from the
        // argument) will not trigger a rerender since it is the same reference
        setRegisterSessions(realm.objects('RegisterSessions'));
      });
    } catch (err: any) {
      console.error('Error opening realm: ', err.message);
    }
  }, [realmRef, setRegisterSessions, user]);

  const closeRegisterSessionRealm = useCallback((): void => {
    const subscription = subscriptionRef.current;
    subscription?.removeAllListeners();
    subscriptionRef.current = null;

    const realm = realmRef.current;
    // If having listeners on the realm itself, also remove them using:
    // realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setRegisterSessions([]);
  }, [realmRef, setRegisterSessions]);

  useEffect(() => {
    if (user) {
      openRealm();
    }

    // Return a cleanup callback to close the realm to prevent memory leaks
    return closeRegisterSessionRealm;
  }, [openRealm, closeRegisterSessionRealm, user]);

  // useEffect(() => {
  //   if (storeShop) {
  //     console.log('prov-current-store', storeShop);
  //     console.log("objectshop", currentShop);
  //   }

  //   // Return a cleanup callback to close the realm to prevent memory leaks
  //   return closeShopRealm;
  // }, [storeShop, closeShopRealm, currentShop]);

  const handleOpenRegisterSession = useCallback(
    async (data?: any): Promise<any> => {
      if (!data) {
        return;
      }

      console.log('from register sesion', storeAgency);

      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      const realm = realmRef.current;
      //   return realm?.write(() => {
      //     return realm?.create(
      //       'RegisterSessions',
      //       RegisterSession.generate(data),
      //     );
      //   });
    },
    [realmRef, storeAgency],
  );

  const handleRegisterSessionEdit = useCallback(
    (id: string, data: any): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        // Normally when updating a record in a NoSQL or SQL database, we have to type
        // a statement that will later be interpreted and used as instructions for how
        // to update the record. But in RealmDB, the objects are "live" because they are
        // actually referencing the object's location in memory on the device (memory mapping).
        // So rather than typing a statement, we modify the object directly by changing
        // the property values. If the changes adhere to the schema, Realm will accept
        // this new version of the object and wherever this object is being referenced
        // locally will also see the changes "live".
        let oldRegisterSession = realm?.objectForPrimaryKey(
          'RegisterSessions',
          new Realm.BSON.ObjectId(id),
        );

        // for (var i = 0; i < data.product_categories; i++) {
        //   oldShop.product_categories.push(data.product_categories[i]);
        // }

        return realm?.create(
          'RegisterSessions',
          {
            _id: new Realm.BSON.ObjectId(id),
            updated_at: new Date(),
          },
          Realm.UpdateMode.Modified,
        );

        // oldShop = {...oldShop, ...data};
        // console.log('from ship', shop);
        // return shop;
      });

      // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
      // realm?.write(() => {
      //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
      //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realmRef],
  );

  const handleGetOneRegisterSession = useCallback(
    (id: string): any => {
      const realm = realmRef.current;
      return realm?.objectForPrimaryKey(
        'RegisterSessions',
        new Realm.BSON.ObjectId(id),
      );

      // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
      // realm?.write(() => {
      //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
      //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realmRef],
  );

  const handleDeleteRegisterSession = useCallback(
    (registerSession: RegisterSession): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.delete(registerSession);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realmRef],
  );

  return (
    <RegisterSessionContext.Provider
      value={{
        handleOpenRegisterSession,
        handleRegisterSessionEdit,
        handleDeleteRegisterSession,
        handleGetOneRegisterSession,
        currentRegisterSession,
        registerSessions,
      }}>
      {children}
    </RegisterSessionContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useRegisterSession = () => {
  const registerSession = useContext(RegisterSessionContext);
  if (registerSession == null) {
    throw new Error(
      'useRegisterSession() called outside of a RegisterSessionProvider?',
    ); // an alert is not placed because this is an error for the developer not the user
  }
  return registerSession;
};

export {RegisterSessionProvider, useRegisterSession};
