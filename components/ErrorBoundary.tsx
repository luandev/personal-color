import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You could also log to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>Something went wrong</ThemedText>
          <ThemedText style={styles.message}>
            We're sorry, but there was an error loading this screen.
          </ThemedText>
          <ThemedText style={styles.errorDetails}>
            {this.state.error?.toString()}
          </ThemedText>
          <View style={styles.buttonContainer}>
            <ThemedView style={styles.retryButton}>
              <ThemedText 
                style={styles.buttonText}
                onPress={() => this.setState({ hasError: false, error: null })}>
                Try Again
              </ThemedText>
            </ThemedView>
          </View>
        </ThemedView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
  errorDetails: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    marginBottom: 24,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#0a7ea4',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
