import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Sanatel Academy',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Gestion Scolaire'),
        ),
        body: const Center(
          child: Text('Ibrahima Sylla'),
        ),
      ),
    );
  }
}
