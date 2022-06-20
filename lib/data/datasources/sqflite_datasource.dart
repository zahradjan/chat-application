import 'package:Decentio/data/datasources/datasource.dart';
import 'package:Decentio/models/chat/Chat.dart';
import 'package:Decentio/models/chatMessage/ChatMessage.dart';
import 'package:sqflite/sqflite.dart';

class SqfliteDataSource implements IDataSource {
  final Database _db;

  const SqfliteDataSource(this._db);

  @override
  Future<void> addChat(Chat chat) {
    // TODO: implement addChat
    throw UnimplementedError();
  }

  @override
  Future<void> addMessage(ChatMessage message) {
    // TODO: implement addMessage
    throw UnimplementedError();
  }

  @override
  Future<void> deleteChat(String chatId) {
    // TODO: implement deleteChat
    throw UnimplementedError();
  }

  @override
  Future<List<Chat>> findAllChats() {
    // TODO: implement findAllChats
    throw UnimplementedError();
  }

  @override
  Future<Chat> findChat(String chatId) {
    // TODO: implement findChat
    throw UnimplementedError();
  }

  @override
  Future<List<ChatMessage>> findMessages(String chatId) {
    // TODO: implement findMessages
    throw UnimplementedError();
  }

  @override
  Future<void> updateMessage(ChatMessage message) {
    // TODO: implement updateMessage
    throw UnimplementedError();
  }

//   @override
//   Future<void> addChat(Chat chat) async {
//     await _db.transaction((txn) async {
//       await txn.insert('chats', chat.toMap(),
//           conflictAlgorithm: ConflictAlgorithm.rollback);
//     });
//   }

//   @override
//   Future<void> addMessage(ChatMessage message) async {
//     await _db.transaction((txn) async {
//       await txn.insert('messages', message.toMap(),
//           conflictAlgorithm: ConflictAlgorithm.replace);
//     });
//   }

//   @override
//   Future<void> deleteChat(String chatId) async {
//     final batch = _db.batch();
//     batch.delete('messages', where: 'chat_id = ?', whereArgs: [chatId]);
//     batch.delete('chats', where: 'id = ?', whereArgs: [chatId]);
//     await batch.commit(noResult: true);
//   }

//   @override
//   Future<List<Chat>> findAllChats() {
//     return _db.transaction((txn) async {
//       final chatsWithLatestMessage =
//           await txn.rawQuery('''SELECT messages.* FROM
//       (SELECT
//         chat_id, MAX(created_at) AS created_at
//        FROM messages
//        GROUP BY chat_id
//       ) AS latest_messages
//       INNER JOIN messages
//       ON messages.chat_id = latest_messages.chat_id
//       AND messages.created_at = latest_messages.created_at
//       ORDER BY messages.created_at DESC''');

//       if (chatsWithLatestMessage.isEmpty) return [];

//       final chatsWithUnreadMessages =
//           await txn.rawQuery('''SELECT chat_id, count(*) as unread
//       FROM messages
//       WHERE receipt = ?
//       GROUP BY chat_id
//       ''', ['deliverred']);

//       return chatsWithLatestMessage.map<Chat>((row) {
//         final int unread = chatsWithUnreadMessages.firstWhere(
//             (ele) => row['chat_id'] == ele['chat_id'],
//             orElse: () => {'unread': 0})['unread'];

//         final chat = Chat.fromMap({"id": row['chat_id']});
//         chat.unread = unread;
//         chat.mostRecent = ChatMessage.fromMap(row);
//         return chat;
//       }).toList();
//     });
//   }

//   @override
//   Future<Chat> findChat(String chatId) async {
//     return await _db.transaction((txn) async {
//       final listOfChatMaps = await txn.query(
//         'chats',
//         where: 'id = ?',
//         whereArgs: [chatId],
//       );

//       if (listOfChatMaps.isEmpty) return null;

//       final unread = Sqflite.firstIntValue(await txn.rawQuery(
//           'SELECT COUNT(*) FROM MESSAGES WHERE chat_id = ? AND receipt = ?',
//           [chatId, 'deliverred']));

//       final mostRecentMessage = await txn.query('messages',
//           where: 'chat_id = ?',
//           whereArgs: [chatId],
//           orderBy: 'created_at DESC',
//           limit: 1);
//       final chat = Chat.fromMap(listOfChatMaps.first);
//       chat.unread = unread;
//       chat.mostRecent = ChatMessage.fromMap(mostRecentMessage.first);
//       return chat;
//     });
//   }

//   @override
//   Future<List<ChatMessage>> findMessages(String chatId) async {
//     final listOfMaps = await _db.query(
//       'messages',
//       where: 'chat_id = ?',
//       whereArgs: [chatId],
//     );

//     return listOfMaps
//         .map<ChatMessage>((map) => ChatMessage.fromMap(map))
//         .toList();
//   }

//   @override
//   Future<void> updateMessage(ChatMessage message) async {
//     await _db.update('messages', message.toMap(),
//         where: 'id = ?',
//         whereArgs: [message.message.id],
//         conflictAlgorithm: ConflictAlgorithm.replace);
//   }

//   // @override
//   // Future<void> updateMessageReceipt(String messageId, ReceiptStatus status) {
//   //   return _db.transaction((txn) async {
//   //     await txn.update('messages', {'receipt': status.value()},
//   //         where: 'id = ?',
//   //         whereArgs: [messageId],
//   //         conflictAlgorithm: ConflictAlgorithm.replace);
//   //   });
//   // }

}
